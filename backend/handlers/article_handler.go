package handlers

import (
	"backend/models"
	"backend/repositories"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
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

func (h *ArticleHandler) GetArticlesBySlug(c *gin.Context) {
	slug := c.Param("slug")
	article, err := h.repository.FindBySlug(slug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan artikel"})
		return
	}
	c.JSON(http.StatusOK, article)
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
	title := c.PostForm("title")
	articleSlug := slug.Make(title)

	articleInput := models.Article{
		Title:      title,
		Content:    c.PostForm("content"),
		Slug:       articleSlug,
		Thumbnail:  thumbnailURL,
		CategoryId: categoryId,
	}

	savedArticle, err := h.repository.Save(articleInput)
	if err != nil {
		log.Printf("Error saat menyimpan artikel: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan artikel"})
		return
	}

	fullNewArticle, err := h.repository.FindByID(savedArticle.Id)
	if err != nil {
		c.JSON(http.StatusCreated, savedArticle)
		return
	}

	c.JSON(http.StatusCreated, fullNewArticle)
}

func (h *ArticleHandler) DeleteArticle(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id artikel tidak valid"})
		return
	}

	err = h.repository.Delete(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Artikel tidak ditemukan"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus artikel"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"pesan": "Artikel berhasil dihapus"})
}

func (h *ArticleHandler) UpdateArticle(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id artikel tidak valid"})
		return
	}
	categoryIdStr := c.PostForm("category_id")
	categoryId, err := strconv.ParseInt(categoryIdStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id kategori tidak sesuai"})
		return
	}

	file, err := c.FormFile("thumbnail")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Thumbnail image required"})
		return
	}

	newFileName := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
	filepath := filepath.Join("public/uploads", newFileName)

	title := c.PostForm("title")
	articleSlug := slug.Make(title)

	thumbnailURL := "http://localhost:8080/" + filepath

	articleData := models.Article{
		Id:         id,
		Title:      title,
		Content:    c.PostForm("content"),
		Slug:       articleSlug,
		Thumbnail:  thumbnailURL,
		CategoryId: categoryId,
	}

	updatedArticle, err := h.repository.Update(articleData)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Artikel tidak ditemukan untuk diupdate"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengupdate artikel"})
		return
	}

	c.JSON(http.StatusOK, updatedArticle)
}
