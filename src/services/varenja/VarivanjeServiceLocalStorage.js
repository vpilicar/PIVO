const KLJUC = 'varenja'

function ucitaj() {
    return JSON.parse(localStorage.getItem(KLJUC) || '[]')
}

function spremi(varenja) {
    localStorage.setItem(KLJUC, JSON.stringify(varenja))
}

function generirajId() {
    return Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase()
}

// 1/4 Read od CRUD
async function get() {
    return { success: true, data: ucitaj() }
}

async function getById(id) {
    const varenja = ucitaj()
    return { success: true, data: varenja.find(v => v.id === id) }
}

// 2/4 Create od CRUD
async function dodaj(varenje) {
    const varenja = ucitaj()
    varenje.id = generirajId()
    varenje.kreiranAt = new Date().toISOString()
    varenja.unshift(varenje)
    spremi(varenja)
    return { success: true }
}

// 3/4 Update od CRUD
async function promjeni(id, varenje) {
    const varenja = ucitaj()
    const index = varenja.findIndex(v => v.id === id)
    varenja[index] = { ...varenja[index], ...varenje }
    spremi(varenja)
    return { success: true }
}

// 4/4 Delete od CRUD
async function obrisi(id) {
    spremi(ucitaj().filter(v => v.id !== id))
    return { success: true }
}

export default {
    get,
    getById,
    dodaj,
    promjeni,
    obrisi,
}
