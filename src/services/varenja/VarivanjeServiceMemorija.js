import { varenja } from './VarivanjePodaci'

function generirajId() {
    return Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase()
}

function nadiIndex(id) {
    return varenja.findIndex(v => v.id === id)
}

// 1/4 Read od CRUD
async function get() {
    return { success: true, data: [...varenja] }
}

async function getById(id) {
    return { success: true, data: varenja.find(v => v.id === id) }
}

// 2/4 Create od CRUD
async function dodaj(varenje) {
    varenje.id = generirajId()
    varenje.kreiranAt = new Date().toISOString()
    varenja.unshift(varenje)
    return { success: true }
}

// 3/4 Update od CRUD
async function promjeni(id, varenje) {
    const index = nadiIndex(id)
    varenja[index] = { ...varenja[index], ...varenje }
    return { success: true }
}

// 4/4 Delete od CRUD
async function obrisi(id) {
    const index = nadiIndex(id)
    varenja.splice(index, 1)
    return { success: true }
}

export default {
    get,
    getById,
    dodaj,
    promjeni,
    obrisi,
}
