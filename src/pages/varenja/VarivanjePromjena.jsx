import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RouteNames } from '../../constants'
import VarivanjeService from '../../services/varenja/VarivanjeService'

const KVASAC_VRSTE = ['ALE', 'LAGER']

export default function VarivanjePromjena() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [varenje, setVarenje] = useState(null)

    useEffect(() => {
        VarivanjeService.getById(id).then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setVarenje(odgovor.data)
        })
    }, [id])

    async function promjeni(podaci) {
        await VarivanjeService.promjeni(id, podaci).then(odgovor => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            navigate(RouteNames.VARENJA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            datum:  podaci.get('datum'),
            hmelj:  parseFloat(podaci.get('hmelj')),
            voda:   parseFloat(podaci.get('voda')),
            kvasac: podaci.get('kvasac'),
            jecam:  parseFloat(podaci.get('jecam')),
            ocjena: podaci.get('ocjena') || null,
        })
    }

    if (!varenje) return <p className="mt-4 text-muted">Učitavanje...</p>

    return (
        <>
            <h3 className="mb-4">Uredi varenje</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="datum" className="mb-3">
                    <Form.Label>Datum varenja</Form.Label>
                    <Form.Control type="date" name="datum" defaultValue={varenje.datum} required />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="hmelj">
                            <Form.Label>Hmelj (grami)</Form.Label>
                            <Form.Control type="number" name="hmelj" min="0" step="0.1" defaultValue={varenje.hmelj} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="voda">
                            <Form.Label>Voda (litre)</Form.Label>
                            <Form.Control type="number" name="voda" min="0" step="0.1" defaultValue={varenje.voda} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="jecam">
                            <Form.Label>Ječam (grami)</Form.Label>
                            <Form.Control type="number" name="jecam" min="0" step="1" defaultValue={varenje.jecam} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="kvasac">
                            <Form.Label>Kvasac — vrsta</Form.Label>
                            <Form.Select name="kvasac" defaultValue={varenje.kvasac} required>
                                <option value="">— Odaberi —</option>
                                {KVASAC_VRSTE.map(k => (
                                    <option key={k} value={k}>{k}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="ocjena" className="mb-4">
                    <Form.Label>Ocjena</Form.Label>
                    <Form.Select name="ocjena" defaultValue={varenje.ocjena || ''}>
                        <option value="">— Nije još ocijenjeno —</option>
                        <option value="dobro">👍 Dobro</option>
                        <option value="srednje">👌 Srednje</option>
                        <option value="lose">👎 Loše</option>
                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Link to={RouteNames.VARENJA} className="btn btn-danger">Odustani</Link>
                    </Col>
                    <Col className="desno">
                        <Button type="submit" variant="warning">Spremi promjene</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
