import { useEffect, useState } from 'react'
import { Badge, Button, Table, Card, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { RouteNames } from '../../constants'
import VarivanjeService from '../../services/varenja/VarivanjeService'
import FormatDatuma from '../../components/FormatDatuma'
import { BsTrash, BsPencil } from 'react-icons/bs'
import useBreakpoint from '../../hooks/useBreakpoint'

const OCJENA_BADGE = {
    dobro:   { bg: 'success', tekst: '👍 Dobro' },
    srednje: { bg: 'warning', tekst: '👌 Srednje' },
    lose:    { bg: 'danger',  tekst: '👎 Loše' },
}

function VarivanjeGrid({ varenja, navigate, obrisi }) {
    return (
        <Row xs={1} sm={2} md={2} lg={3} className="g-3">
            {varenja.map(v => (
                <Col key={v.id}>
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title style={{ fontSize: '15px' }}>
                                <FormatDatuma datum={v.datum} />
                            </Card.Title>
                            <div style={{ fontSize: '14px' }}>
                                <div>🌿 Hmelj: <strong>{v.hmelj} g</strong></div>
                                <div>💧 Voda: <strong>{v.voda} L</strong></div>
                                <div>🌾 Ječam: <strong>{v.jecam} g</strong></div>
                                <div className="mt-1">
                                    <Badge bg={v.kvasac === 'ALE' ? 'primary' : 'secondary'}>
                                        {v.kvasac}
                                    </Badge>
                                </div>
                                {v.ocjena && (
                                    <div className="mt-1">
                                        <Badge
                                            bg={OCJENA_BADGE[v.ocjena].bg}
                                            text={v.ocjena === 'srednje' ? 'dark' : undefined}
                                        >
                                            {OCJENA_BADGE[v.ocjena].tekst}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                        <Card.Footer className="d-flex gap-2">
                            <Button variant="outline-warning" size="sm" onClick={() => navigate(`/varenja/${v.id}`)}>
                                <BsPencil /> Uredi
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => obrisi(v.id)}>
                                <BsTrash /> Obriši
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

function VarivanjeTablica({ varenja, navigate, obrisi }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Hmelj (g)</th>
                    <th>Voda (L)</th>
                    <th>Ječam (g)</th>
                    <th>Kvasac</th>
                    <th>Ocjena</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {varenja.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center text-muted py-4">
                            Nema varenja. <Link to={RouteNames.VARENJA_NOVO}>Dodajte prvo varenje →</Link>
                        </td>
                    </tr>
                ) : (
                    varenja.map(v => (
                        <tr key={v.id}>
                            <td><FormatDatuma datum={v.datum} /></td>
                            <td className="text-end">{v.hmelj} g</td>
                            <td className="text-end">{v.voda} L</td>
                            <td className="text-end">{v.jecam} g</td>
                            <td>
                                <Badge bg={v.kvasac === 'ALE' ? 'primary' : 'secondary'}>
                                    {v.kvasac}
                                </Badge>
                            </td>
                            <td>
                                {v.ocjena ? (
                                    <Badge
                                        bg={OCJENA_BADGE[v.ocjena].bg}
                                        text={v.ocjena === 'srednje' ? 'dark' : undefined}
                                    >
                                        {OCJENA_BADGE[v.ocjena].tekst}
                                    </Badge>
                                ) : (
                                    <span className="text-muted" style={{ fontSize: '13px' }}>—</span>
                                )}
                            </td>
                            <td>
                                <Button variant="outline-warning" size="sm" className="me-2" onClick={() => navigate(`/varenja/${v.id}`)}>
                                    <BsPencil />
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => obrisi(v.id)}>
                                    <BsTrash />
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

export default function VarivanjePregled() {
    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [varenja, setVarenja] = useState([])

    useEffect(() => {
        ucitajVarenja()
    }, [])

    async function ucitajVarenja() {
        await VarivanjeService.get().then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setVarenja(odgovor.data)
        })
    }

    async function obrisi(id) {
        if (!confirm('Sigurno obrisati ovo varenje?')) return
        await VarivanjeService.obrisi(id)
        ucitajVarenja()
    }

    return (
        <>
            <Link to={RouteNames.VARENJA_NOVO} className="btn btn-warning w-100 my-3">
                + Dodaj novo varenje
            </Link>

            {['xs', 'sm', 'md'].includes(sirina) ? (
                <VarivanjeGrid varenja={varenja} navigate={navigate} obrisi={obrisi} />
            ) : (
                <VarivanjeTablica varenja={varenja} navigate={navigate} obrisi={obrisi} />
            )}
        </>
    )
}
