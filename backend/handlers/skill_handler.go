package handlers

import (
	"backend/models"
	"backend/repositories"
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SkillHandler struct {
	repository repositories.SkillRepository
}

func NewSkillHandler(repository repositories.SkillRepository) *SkillHandler {
	return &SkillHandler{repository: repository}
}

func (h *SkillHandler) GetSkills(c *gin.Context) {
	skills, err := h.repository.FindAll()
	if err != nil {
		log.Printf("Error saat menampilkan skill: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menampilkan skill"})
		return
	}
	c.JSON(http.StatusOK, skills)
}

func (h *SkillHandler) CreateSkills(c *gin.Context) {
	skillInput := models.Skill{
		Name: c.PostForm("name"),
	}

	savedSkill, err := h.repository.Save(skillInput)
	if err != nil {
		log.Printf("Error saat menambahkan skill: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menambahkan skill"})
		return
	}

	c.JSON(http.StatusOK, savedSkill)
}

func (h *SkillHandler) DeleteSkills(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id skill tidak valid"})
		return
	}

	err = h.repository.Delete(id)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill tidak ditemukan"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus skill"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Pesan": "Skill berhasil dihapus"})
}

func (h *SkillHandler) UpdateSkills(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id skill tidak valid"})
		return
	}

	skillInput := models.Skill{
		Id:   id,
		Name: c.PostForm("name"),
	}

	updateSkill, err := h.repository.Update(skillInput)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Skill tidak ditemukan"})
			return
		}
		log.Printf("%s", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengubah skill"})
		return
	}

	c.JSON(http.StatusOK, updateSkill)
}
