package handlers

import (
	"backend/models"
	"backend/repositories"
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
)

type PortfolioHandler struct {
	repository repositories.PortfolioRepository
}

func NewPortfolioHandler(repository repositories.PortfolioRepository) *PortfolioHandler {
	return &PortfolioHandler{repository: repository}
}

func (h *PortfolioHandler) GetPortfolios(c *gin.Context) {
	portfolios, err := h.repository.FindAll()
	if err != nil {
		log.Printf("Error saat mengambil portofolio: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan portofolio"})
		return
	}
	c.JSON(http.StatusOK, portfolios)
}

func (h *PortfolioHandler) GetPortfoliosBySlug(c *gin.Context) {
	slug := c.Param("slug")
	portfolio, err := h.repository.FindBySlug(slug)
	if err != nil {
		log.Printf("Error saat mengambil portofolio: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan portofolio"})
		return
	}
	c.JSON(http.StatusOK, portfolio)
}

func (h *PortfolioHandler) CreatePortfolios(c *gin.Context) {
	var input models.Portfolio
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.Slug = slug.Make(input.Title)
	newPortfolio, err := h.repository.Save(input)
	if err != nil {
		log.Printf("Gagal menyimpan portofolio: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan portofolio"})
		return
	}

	c.JSON(http.StatusCreated, newPortfolio)
}

func (h *PortfolioHandler) DeletePortfolios(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID portofolio tidak valid"})
		return
	}

	err = h.repository.Delete(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Portofolio tidak ditemukan"})
			return
		}
		log.Printf("Gagal menghapus portofolio: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus portofolio"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Portofolio berhasil dihapus"})
}

func (h *PortfolioHandler) UpdatePortfolios(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id portofolio tidak valid"})
		return
	}

	var input models.Portfolio
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.Id = id
	input.Slug = slug.Make(input.Title)

	updatedPortfolio, err := h.repository.Update(input)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Portofolio tidak ditemukan untuk diupdate"})
			return
		}
		log.Printf("Gagal mengupdate portofolio: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengupdate portofolio"})
		return
	}

	c.JSON(http.StatusOK, updatedPortfolio)
}
