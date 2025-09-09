package repositories

import (
	"backend/models"
	"database/sql"
)

type PortfolioRepository interface {
	FindAll() ([]models.Portfolio, error)
	FindBySlug(slug string) (models.Portfolio, error)
	FindById(id int64) (models.Portfolio, error)
	Save(portfolio models.Portfolio) (models.Portfolio, error)
	Delete(id int64) error
	Update(portfolio models.Portfolio) (models.Portfolio, error)
}

type portfolioRepository struct {
	db *sql.DB
}

func NewPortfolioRepository(db *sql.DB) PortfolioRepository {
	return &portfolioRepository{db: db}
}

func (r *portfolioRepository) FindAll() ([]models.Portfolio, error) {
	rows, err := r.db.Query("SELECT p.id, p.title, p.slug, p.thumbnail_url, c.id as category_id, c.name as category_name, (SELECT content FROM portfolio_content_blocks WHERE portfolio_id = p.id AND block_type = 'paragraph' ORDER BY ordering ASC LIMIT 1) as description FROM portfolios p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var portfolios []models.Portfolio
	for rows.Next() {
		var portfolio models.Portfolio
		var categoryID sql.NullInt64
		var categoryName sql.NullString
		var description sql.NullString

		if err := rows.Scan(
			&portfolio.Id,
			&portfolio.Title,
			&portfolio.Slug,
			&portfolio.Thumbnail,
			&categoryID,
			&categoryName,
			&description,
		); err != nil {
			return nil, err
		}
		if categoryID.Valid {
			portfolio.Category.Id = categoryID.Int64
			portfolio.CategoryId = categoryID.Int64
		}
		if categoryName.Valid {
			portfolio.Category.Name = categoryName.String
		}
		if description.Valid {
			portfolio.Description = description.String
		}

		portfolios = append(portfolios, portfolio)
	}

	return portfolios, nil
}

func (r *portfolioRepository) FindBySlug(slug string) (models.Portfolio, error) {
	var portfolio models.Portfolio

	queryPortfolio := `
        SELECT 
            p.id, p.title, p.slug, p.thumbnail_url, p.created_at, p.updated_at,
            c.id as category_id, c.name as category_name
        FROM portfolios p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.slug = $1`

	row := r.db.QueryRow(queryPortfolio, slug)

	var categoryID sql.NullInt64
	var categoryName sql.NullString

	err := row.Scan(
		&portfolio.Id,
		&portfolio.Title,
		&portfolio.Slug,
		&portfolio.Thumbnail,
		&categoryID,
		&categoryName,
	)

	if err != nil {
		return models.Portfolio{}, err
	}

	if categoryID.Valid {
		portfolio.Category.Id = categoryID.Int64
		portfolio.CategoryId = categoryID.Int64
	}
	if categoryName.Valid {
		portfolio.Category.Name = categoryName.String
	}

	queryImages := "SELECT id, image_url, caption, ordering FROM portfolio_images WHERE portfolio_id = $1 ORDER BY ordering ASC"
	rowsImages, err := r.db.Query(queryImages, portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}
	defer rowsImages.Close()

	var galleryImages []models.PortfolioImage
	for rowsImages.Next() {
		var img models.PortfolioImage
		if err := rowsImages.Scan(&img.Id, &img.Image, &img.Caption, &img.Ordering); err != nil {
			return models.Portfolio{}, err
		}
		galleryImages = append(galleryImages, img)
	}
	portfolio.GalleryImages = galleryImages

	queryBlocks := "SELECT id, block_type, content, ordering FROM portfolio_content_blocks WHERE portfolio_id = $1 ORDER BY ordering ASC"
	rowsBlocks, err := r.db.Query(queryBlocks, portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}
	defer rowsBlocks.Close()

	var contentBlocks []models.PortfolioContentBlock
	for rowsBlocks.Next() {
		var block models.PortfolioContentBlock
		if err := rowsBlocks.Scan(&block.Id, &block.BlockType, &block.Content, &block.Ordering); err != nil {
			return models.Portfolio{}, err
		}
		contentBlocks = append(contentBlocks, block)
	}
	portfolio.ContentBlocks = contentBlocks

	return portfolio, nil
}

func (r *portfolioRepository) FindById(id int64) (models.Portfolio, error) {
	var portfolio models.Portfolio

	queryPortfolio := `
        SELECT 
            p.id, p.title, p.slug, p.thumbnail_url, p.created_at, p.updated_at,
            c.id as category_id, c.name as category_name
        FROM portfolios p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.id = $1`

	row := r.db.QueryRow(queryPortfolio, id)

	var categoryID sql.NullInt64
	var categoryName sql.NullString

	err := row.Scan(
		&portfolio.Id,
		&portfolio.Title,
		&portfolio.Slug,
		&portfolio.Thumbnail,
		&categoryID,
		&categoryName,
	)

	if err != nil {
		return models.Portfolio{}, err
	}

	if categoryID.Valid {
		portfolio.Category.Id = categoryID.Int64
		portfolio.CategoryId = categoryID.Int64
	}
	if categoryName.Valid {
		portfolio.Category.Name = categoryName.String
	}

	queryImages := "SELECT id, image_url, caption, ordering FROM portfolio_images WHERE portfolio_id = $1 ORDER BY ordering ASC"
	rowsImages, err := r.db.Query(queryImages, portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}
	defer rowsImages.Close()

	var galleryImages []models.PortfolioImage
	for rowsImages.Next() {
		var img models.PortfolioImage
		if err := rowsImages.Scan(&img.Id, &img.Image, &img.Caption, &img.Ordering); err != nil {
			return models.Portfolio{}, err
		}
		galleryImages = append(galleryImages, img)
	}
	portfolio.GalleryImages = galleryImages

	queryBlocks := "SELECT id, block_type, content, ordering FROM portfolio_content_blocks WHERE portfolio_id = $1 ORDER BY ordering ASC"
	rowsBlocks, err := r.db.Query(queryBlocks, portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}
	defer rowsBlocks.Close()

	var contentBlocks []models.PortfolioContentBlock
	for rowsBlocks.Next() {
		var block models.PortfolioContentBlock
		if err := rowsBlocks.Scan(&block.Id, &block.BlockType, &block.Content, &block.Ordering); err != nil {
			return models.Portfolio{}, err
		}
		contentBlocks = append(contentBlocks, block)
	}
	portfolio.ContentBlocks = contentBlocks

	return portfolio, nil
}

func (r *portfolioRepository) Save(portfolio models.Portfolio) (models.Portfolio, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return models.Portfolio{}, err
	}
	defer tx.Rollback()

	queryPortfolio := "INSERT INTO portfolios (title, slug, thumbnail_url, category_id) VALUES ($1, $2, $3, $4) RETURNING id"
	var newPortfolioId int64

	err = tx.QueryRow(queryPortfolio, portfolio.Title, portfolio.Slug, portfolio.Thumbnail, portfolio.CategoryId).Scan(&newPortfolioId)
	if err != nil {
		return models.Portfolio{}, err
	}

	if len(portfolio.GalleryImages) > 0 {
		queryImages := "INSERT INTO portfolio_images (portfolio_id, image_url, caption, ordering) VALUES ($1, $2, $3, $4)"
		for _, img := range portfolio.GalleryImages {
			_, err := tx.Exec(queryImages, newPortfolioId, img.Image, img.Caption, img.Ordering)
			if err != nil {
				return models.Portfolio{}, err
			}
		}
	}

	if len(portfolio.ContentBlocks) > 0 {
		queryBlocks := "INSERT INTO portfolio_content_blocks (portfolio_id, block_type, content, ordering) VALUES ($1, $2, $3, $4)"
		for _, block := range portfolio.ContentBlocks {
			_, err := tx.Exec(queryBlocks, newPortfolioId, block.BlockType, block.Content, block.Ordering)
			if err != nil {
				return models.Portfolio{}, err
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return models.Portfolio{}, err
	}

	return r.FindById(newPortfolioId)
}

func (r *portfolioRepository) Delete(id int64) error {
	query := "DELETE FROM portfolios WHERE id = $1"

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

func (r *portfolioRepository) Update(portfolio models.Portfolio) (models.Portfolio, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return models.Portfolio{}, err
	}
	defer tx.Rollback()

	queryPortfolio := `
		UPDATE portfolios 
		SET title = $1, slug = $2, thumbnail_url = $3, category_id = $4, updated_at = NOW() 
		WHERE id = $5`
	_, err = tx.Exec(queryPortfolio, portfolio.Title, portfolio.Slug, portfolio.Thumbnail, portfolio.CategoryId, portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}

	_, err = tx.Exec("DELETE FROM portfolio_images WHERE portfolio_id = $1", portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}

	_, err = tx.Exec("DELETE FROM portfolio_content_blocks WHERE portfolio_id = $1", portfolio.Id)
	if err != nil {
		return models.Portfolio{}, err
	}

	if len(portfolio.GalleryImages) > 0 {
		queryImages := "INSERT INTO portfolio_images (portfolio_id, image_url, caption, ordering) VALUES ($1, $2, $3, $4)"
		for _, img := range portfolio.GalleryImages {
			_, err := tx.Exec(queryImages, portfolio.Id, img.Image, img.Caption, img.Ordering)
			if err != nil {
				return models.Portfolio{}, err
			}
		}
	}

	if len(portfolio.ContentBlocks) > 0 {
		queryBlocks := "INSERT INTO portfolio_content_blocks (portfolio_id, block_type, content, ordering) VALUES ($1, $2, $3, $4)"
		for _, block := range portfolio.ContentBlocks {
			_, err := tx.Exec(queryBlocks, portfolio.Id, block.BlockType, block.Content, block.Ordering)
			if err != nil {
				return models.Portfolio{}, err
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return models.Portfolio{}, err
	}

	return r.FindById(portfolio.Id)
}
