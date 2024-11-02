package types

import (
	fiModels "backend/models/fi"
	noModels "backend/models/no"
	seModels "backend/models/se"
)

type ResponseType interface {
	fiModels.Response | seModels.Response | noModels.Response
}
