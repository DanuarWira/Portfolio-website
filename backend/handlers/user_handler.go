package handlers

import (
	"backend/auth"
	"backend/models"
	"backend/repositories"
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	repository repositories.UserRepository
}

func NewUserHandler(repository repositories.UserRepository) *UserHandler {
	return &UserHandler{repository: repository}
}

func (h *UserHandler) Login(c *gin.Context) {
	var loginDetails struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username dan password dibutuhkan"})
		return
	}

	user, err := h.repository.FindByUsername(loginDetails.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username atau password salah"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username atau password salah"})
		return
	}

	token, err := auth.GenerateToken(uint(user.Id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func (h *UserHandler) Register(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error saat membuat akun: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses password"})
		return
	}

	user := models.User{
		Username: input.Username,
		Password: string(hashedPassword),
	}

	savedUser, err := h.repository.Save(user)
	if err != nil {
		log.Printf("Error saat membuat akun: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan akun"})
		return
	}

	newUser, err := h.repository.FindByUsername(savedUser.Username)
	if err == nil {
		log.Printf("Error saat membuat akun: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username sudah digunakan"})
		return
	}
	if err != sql.ErrNoRows {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memverifikasi username"})
		return
	}

	c.JSON(http.StatusCreated, newUser)
}
