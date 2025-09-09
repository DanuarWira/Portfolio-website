package handlers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type UploadHandler struct{}

func NewUploadHandler() *UploadHandler {
	return &UploadHandler{}
}

func (h *UploadHandler) UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tidak ada file yang di-upload"})
		return
	}

	newFileName := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)

	filePath := filepath.Join("public/uploads", newFileName)

	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan file"})
		return
	}

	url := "http://localhost:8080/" + filePath

	c.JSON(http.StatusOK, gin.H{"url": url})
}
