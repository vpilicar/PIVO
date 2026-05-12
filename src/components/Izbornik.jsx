import { Container, Nav, Navbar } from 'react-bootstrap'
import { IME_APLIKACIJE, RouteNames } from '../constants.js'
import { useNavigate } from 'react-router-dom'

export default function Izbornik() {
    const navigate = useNavigate()

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => navigate(RouteNames.HOME)} style={{ cursor: 'pointer' }}>
                    🍺 {IME_APLIKACIJE}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate(RouteNames.HOME)}>
                            Početna
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate(RouteNames.VARENJA)}>
                            Varenja
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate(RouteNames.VARENJA_NOVO)}>
                            Novo varenje
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
