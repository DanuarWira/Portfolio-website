package repositories

import (
	"backend/models"
	"database/sql"
)

type SkillRepository interface {
	FindAll() ([]models.Skill, error)
	Save(skill models.Skill) (models.Skill, error)
	Delete(id int64) error
	Update(skill models.Skill) (models.Skill, error)
}

type skillRepository struct {
	db *sql.DB
}

func NewSkillRepository(db *sql.DB) SkillRepository {
	return &skillRepository{db: db}
}

func (r *skillRepository) FindAll() ([]models.Skill, error) {
	rows, err := r.db.Query("SELECT s.id, s.name FROM skills s ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var skills []models.Skill
	for rows.Next() {
		var skill models.Skill

		if err := rows.Scan(
			&skill.Id,
			&skill.Name,
		); err != nil {
			return nil, err
		}

		skills = append(skills, skill)
	}

	return skills, nil
}

func (r *skillRepository) FindById(id int64) (models.Skill, error) {
	query := "SELECT s.id, s.name FROM skills s WHERE s.id = $1"

	row := r.db.QueryRow(query, id)

	var skill models.Skill

	err := row.Scan(
		&skill.Id,
		&skill.Name,
	)
	if err != nil {
		return models.Skill{}, err
	}

	return skill, nil
}

func (r *skillRepository) Save(skill models.Skill) (models.Skill, error) {
	query := "INSERT INTO skills (name) VALUES ($1) RETURNING id"
	err := r.db.QueryRow(query, skill.Name).Scan(&skill.Id)
	if err != nil {
		return models.Skill{}, err
	}
	return skill, nil
}

func (r *skillRepository) Delete(id int64) error {
	query := "DELETE FROM skills WHERE id = $1"

	result, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *skillRepository) Update(skill models.Skill) (models.Skill, error) {
	query := "UPDATE skills SET name = $1, updated_at = NOW() WHERE id = $2"

	result, err := r.db.Exec(query, skill.Name, skill.Id)
	if err != nil {
		return models.Skill{}, err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return models.Skill{}, sql.ErrNoRows
	}

	return r.FindById(skill.Id)
}
