package repositories

import (
	"backend/models"
	"database/sql"
)

type ExperienceRepository interface {
	FindAll() ([]models.Experience, error)
	FindByID(id int64) (models.Experience, error)
	Save(experience models.Experience) (models.Experience, error)
	Delete(id int64) error
	Update(experience models.Experience) (models.Experience, error)
}

type experienceRepository struct {
	db *sql.DB
}

func NewExperienceRepository(db *sql.DB) ExperienceRepository {
	return &experienceRepository{db: db}
}

func (r *experienceRepository) FindAll() ([]models.Experience, error) {
	rows, err := r.db.Query("SELECT id, job_title, company_name, description, start_date, end_date FROM experiences ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var experiences []models.Experience
	var endDate sql.NullTime

	for rows.Next() {
		var experience models.Experience
		if err := rows.Scan(
			&experience.Id,
			&experience.JobTitle,
			&experience.CompanyName,
			&experience.Description,
			&experience.StartDate,
			&endDate,
		); err != nil {
			return nil, err
		}

		experiences = append(experiences, experience)
	}

	return experiences, nil
}

func (r *experienceRepository) FindByID(id int64) (models.Experience, error) {
	query := "SELECT id, job_title, company_name, description, start_date, end_date FROM experiences WHERE id = $1"

	row := r.db.QueryRow(query, id)

	var experience models.Experience
	var endDate sql.NullTime

	err := row.Scan(
		&experience.Id,
		&experience.JobTitle,
		&experience.CompanyName,
		&experience.StartDate,
		&endDate,
		&experience.Description,
	)
	if err != nil {
		return models.Experience{}, err
	}

	return experience, nil
}

func (r *experienceRepository) Save(experience models.Experience) (models.Experience, error) {
	query := "INSERT INTO experiences (job_title, company_name, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	err := r.db.QueryRow(query, experience.JobTitle, experience.CompanyName, experience.Description, experience.StartDate, experience.EndDate).Scan(&experience.Id)
	if err != nil {
		return models.Experience{}, err
	}

	return experience, nil
}

func (r *experienceRepository) Delete(id int64) error {
	query := "DELETE FROM experiences WHERE id = $1"

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

func (r *experienceRepository) Update(experience models.Experience) (models.Experience, error) {
	query := "UPDATE experiences SET job_title = $1, company_name = $2, , description = $3, start_date = $4, end_date = $5, updated_at = NOW() WHERE id = $6"

	result, err := r.db.Exec(query, experience.JobTitle, experience.CompanyName, experience.StartDate, experience.EndDate, experience.Description)
	if err != nil {
		return models.Experience{}, err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return models.Experience{}, sql.ErrNoRows
	}

	return r.FindByID(experience.Id)
}
