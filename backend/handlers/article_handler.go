package handlers

import (
	"backend/models"
	"backend/repositories"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ArticleHandler struct {
	repository repositories.ArticleRepository
}

func NewArticleHandler(repository repositories.ArticleRepository) *ArticleHandler {
	return &ArticleHandler{repository: repository}
}

func (h *ArticleHandler) GetArticles(c *gin.Context) {
	articles, err := h.repository.FindAll()
	if err != nil {
		log.Printf("Error saat mengambil artikel: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan artikel"})
		return
	}
	c.JSON(http.StatusOK, articles)
}

func (h *ArticleHandler) CreateArticles(c *gin.Context) {
	file, err := c.FormFile("thumbnail")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Thumbnail image required"})
		return
	}

	newFileName := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
	filepath := filepath.Join("public/uploads", newFileName)

	if err := c.SaveUploadedFile(file, filepath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save file"})
		return
	}

	categoryIdStr := c.PostForm("category_id")
	categoryId, err := strconv.ParseInt(categoryIdStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id kategori tidak sesuai"})
		return
	}

	thumbnailURL := "http://localhost:8080/" + filepath

	articleInput := models.Article{
		Title:      c.PostForm("title"),
		Content:    c.PostForm("content"),
		Thumbnail:  thumbnailURL,
		CategoryId: categoryId,
	}

	newArticle, err := h.repository.Save(articleInput)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan artikel"})
		return
	}

	newArticle.CategoryId = 0

	c.JSON(http.StatusCreated, newArticle)
}
