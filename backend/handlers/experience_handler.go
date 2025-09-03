package handlers

import (
	"backend/models"
	"backend/repositories"
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ExperienceHandler struct {
	repository repositories.ExperienceRepository
}

func NewExperienceHandler(repository repositories.ExperienceRepository) *ExperienceHandler {
	return &ExperienceHandler{repository: repository}
}

func (h *ExperienceHandler) GetExperiences(c *gin.Context) {
	experiences, err := h.repository.FindAll()
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan pengalaman"})
		return
	}

	var responses []models.ExperienceResponse

	for _, experience := range experiences {
		endDateStr := "Present"
		if experience.EndDate != nil {
			endDateStr = experience.EndDate.Format("01-2006")
		}

		response := models.ExperienceResponse{
			Id:          experience.Id,
			JobTitle:    experience.JobTitle,
			CompanyName: experience.CompanyName,
			Description: experience.Description,
			StartDate:   experience.StartDate.Format("01-2006"),
			EndDate:     endDateStr,
		}

		responses = append(responses, response)
	}

	c.JSON(http.StatusOK, responses)
}

func (h *ExperienceHandler) CreateExperiences(c *gin.Context) {
	startDateStr := c.PostForm("start_date")
	layout := "01-2006"

	startDate, err := time.Parse(layout, startDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format tanggal mulai tidak sesuai"})
		return
	}

	var endDatePtr *time.Time
	endDateStr := c.PostForm("end_date")
	if endDateStr != "" {
		endDate, err := time.Parse(layout, endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format end_date tidak valid, gunakan format YYYY-MM."})
			return
		}
		endDatePtr = &endDate
	}

	experienceInput := models.Experience{
		JobTitle:    c.PostForm("job_title"),
		CompanyName: c.PostForm("company_name"),
		StartDate:   startDate,
		EndDate:     endDatePtr,
		Description: c.PostForm("description"),
	}

	savedExperience, err := h.repository.Save(experienceInput)
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan pengalaman kerja"})
		return
	}

	fullExperience, err := h.repository.FindByID(savedExperience.Id)
	if err != nil {
		c.JSON(http.StatusCreated, savedExperience)
		return
	}

	c.JSON(http.StatusOK, fullExperience)
}

func (h *ExperienceHandler) DeleteExperiences(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id pengalaman tidak valid"})
	}

	err = h.repository.Delete(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "pengalaman tidak ditemukan"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus pengalaman"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Pesan": "Pengalaman berhasil dihapus"})
}

func (h *ExperienceHandler) UpdateExperiences(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id pengalaman tidak valid"})
	}

	startDateStr := c.PostForm("start_date")
	layout := "01-2006"

	startDate, err := time.Parse(layout, startDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format tanggal mulai tidak sesuai"})
		return
	}

	var endDatePtr *time.Time
	endDateStr := c.PostForm("end_date")
	if endDateStr != "" {
		endDate, err := time.Parse(layout, endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Format end_date tidak valid, gunakan format YYYY-MM."})
			return
		}
		endDatePtr = &endDate
	}

	experienceInput := models.Experience{
		Id:          id,
		JobTitle:    c.PostForm("job_title"),
		CompanyName: c.PostForm("company_name"),
		StartDate:   startDate,
		EndDate:     endDatePtr,
		Description: c.PostForm("description"),
	}

	savedExperience, err := h.repository.Save(experienceInput)
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan pengalaman kerja"})
		return
	}

	fullExperience, err := h.repository.FindByID(savedExperience.Id)
	if err != nil {
		c.JSON(http.StatusCreated, savedExperience)
		return
	}

	c.JSON(http.StatusOK, fullExperience)
}
