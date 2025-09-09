package repositories

import (
	"backend/models"
	"database/sql"
)

type UserRepository interface {
	FindByUsername(username string) (models.User, error)
	Save(user models.User) (models.User, error)
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindByUsername(username string) (models.User, error) {
	query := "SELECT id, username, password FROM users WHERE username = $1"

	row := r.db.QueryRow(query, username)

	var user models.User

	err := row.Scan(
		&user.Id,
		&user.Username,
		&user.Password,
	)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (r *userRepository) Save(user models.User) (models.User, error) {
	query := "INSERT INTO users (username, password) VALUES ($1, $2) returning id"
	err := r.db.QueryRow(query, user.Username, user.Password).Scan(&user.Id)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}
