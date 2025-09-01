package repositories

import (
	"backend/models"
	"database/sql"
)

type ArticleRepository interface {
	FindAll() ([]models.Article, error)
	FindByID(id int64) (models.Article, error)
	FindBySlug(slug string) (models.Article, error)
	Save(article models.Article) (models.Article, error)
	Delete(id int64) error
	Update(article models.Article) (models.Article, error)
}

type articleRepository struct {
	db *sql.DB
}

func NewArticleRepository(db *sql.DB) ArticleRepository {
	return &articleRepository{db: db}
}

func (r *articleRepository) FindAll() ([]models.Article, error) {
	rows, err := r.db.Query("SELECT a.id, a.title, a.content, a.slug, a.thumbnail_url, c.id as category_id, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id ORDER BY a.created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []models.Article
	for rows.Next() {
		var article models.Article
		var categoryID sql.NullInt64
		var categoryName sql.NullString

		if err := rows.Scan(
			&article.Id,
			&article.Title,
			&article.Content,
			&article.Slug,
			&article.Thumbnail,
			&categoryID,
			&categoryName,
		); err != nil {
			return nil, err
		}
		if categoryID.Valid {
			article.Category.Id = categoryID.Int64
			article.CategoryId = categoryID.Int64
		}
		if categoryName.Valid {
			article.Category.Name = categoryName.String
		}

		articles = append(articles, article)
	}

	return articles, nil
}

func (r *articleRepository) FindByID(id int64) (models.Article, error) {
	query := `
		SELECT 
			a.id, a.title, a.content, a.slug, a.thumbnail_url, 
			c.id as category_id, c.name as category_name 
		FROM articles a 
		LEFT JOIN categories c ON a.category_id = c.id 
		WHERE a.id = $1`

	row := r.db.QueryRow(query, id)

	var article models.Article
	var categoryID sql.NullInt64
	var categoryName sql.NullString

	err := row.Scan(
		&article.Id,
		&article.Title,
		&article.Content,
		&article.Slug,
		&article.Thumbnail,
		&categoryID,
		&categoryName,
	)
	if err != nil {
		return models.Article{}, err
	}
	if categoryID.Valid {
		article.Category.Id = categoryID.Int64
		article.CategoryId = categoryID.Int64
	}
	if categoryName.Valid {
		article.Category.Name = categoryName.String
	}

	return article, nil
}

func (r *articleRepository) FindBySlug(slug string) (models.Article, error) {
	query := `
		SELECT 
			a.id, a.title, a.content, a.slug, a.thumbnail_url, 
			c.id as category_id, c.name as category_name 
		FROM articles a 
		LEFT JOIN categories c ON a.category_id = c.id 
		WHERE a.slug = $1`

	row := r.db.QueryRow(query, slug)

	var article models.Article
	var categoryID sql.NullInt64
	var categoryName sql.NullString

	err := row.Scan(
		&article.Id,
		&article.Title,
		&article.Content,
		&article.Slug,
		&article.Thumbnail,
		&categoryID,
		&categoryName,
	)
	if err != nil {
		return models.Article{}, err
	}
	if categoryID.Valid {
		article.Category.Id = categoryID.Int64
		article.CategoryId = categoryID.Int64
	}
	if categoryName.Valid {
		article.Category.Name = categoryName.String
	}

	return article, nil
}

func (r *articleRepository) Save(article models.Article) (models.Article, error) {
	query := "INSERT INTO articles (title, content, thumbnail_url, category_id, slug) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	err := r.db.QueryRow(query, article.Title, article.Content, article.Thumbnail, article.CategoryId, article.Slug).Scan(&article.Id)
	if err != nil {
		return models.Article{}, err
	}
	return article, nil
}

func (r *articleRepository) Delete(id int64) error {
	query := "DELETE FROM articles WHERE id = $1"

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

func (r *articleRepository) Update(article models.Article) (models.Article, error) {
	query := `UPDATE articles SET title = $1, content = $2, thumbnail_url = $3, category_id = $4, slug = $5, updated_at = NOW() WHERE id = $6`

	result, err := r.db.Exec(query, article.Title, article.Content, article.Thumbnail, article.CategoryId, article.Slug, article.Id)
	if err != nil {
		return models.Article{}, err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return models.Article{}, sql.ErrNoRows
	}

	return r.FindByID(article.Id)
}
