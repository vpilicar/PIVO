import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../constants'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="text-center mt-5">
            <div style={{ fontSize: '80px', lineHeight: 1 }}>🍺</div>
            <h1 className="display-5 fw-bold mt-3 mb-3">Pivo APP</h1>
            <p className="lead text-muted mb-5">
                Evidencija varenja piva — pratite sastojke, datum i kvalitetu svakog varenja.
            </p>
            <div className="d-flex justify-content-center gap-3">
                <Button
                    variant="warning"
                    size="lg"
                    onClick={() => navigate(RouteNames.VARENJA_NOVO)}
                >
                    + Novo varenje
                </Button>
                <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => navigate(RouteNames.VARENJA)}
                >
                    Pregled varenja
                </Button>
            </div>
        </div>
    )
}
