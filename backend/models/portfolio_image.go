package models

type PortfolioImage struct {
	Id          int64  `json:"id"`
	PortfolioId int64  `json:"-"`
	Image       string `json:"image_url"`
	Caption     string `json:"caption"`
	Ordering    int    `json:"ordering"`
}
