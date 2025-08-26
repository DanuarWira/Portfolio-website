package repositories

import (
	"backend/models"
	"database/sql"
)

type ArticleRepository interface {
	FindAll() ([]models.Article, error)
	FindByID(id int64) (models.Article, error)
	Save(article models.Article) (models.Article, error)
}

type articleRepository struct {
	db *sql.DB
}

func NewArticleRepository(db *sql.DB) ArticleRepository {
	return &articleRepository{db: db}
}

func (r *articleRepository) FindAll() ([]models.Article, error) {
	rows, err := r.db.Query("SELECT a.id, a.title, a.content, a.thumbnail_url, c.id as category_id, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id ORDER BY a.created_at DESC")
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
			a.id, a.title, a.content, a.thumbnail_url, 
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
	query := "INSERT INTO articles (title, content, thumbnail_url, category_id) VALUES ($1, $2, $3, $4) RETURNING id"
	err := r.db.QueryRow(query, article.Title, article.Content, article.Thumbnail, article.CategoryId).Scan(&article.Id)
	if err != nil {
		return models.Article{}, err
	}
	return article, nil
}

func (r *articleRepository) Delete() {

}

func (r *articleRepository) Update() {

}
