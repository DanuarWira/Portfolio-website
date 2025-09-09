package models

type PortfolioContentBlock struct {
	Id          int64  `json:"id"`
	PortfolioId int64  `json:"-"`
	BlockType   string `"json:"block_type"`
	Content     string `json:"content"`
	Ordering    int    `json:"ordering"`
}
