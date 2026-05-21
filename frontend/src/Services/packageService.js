const BASE_URL = 'http://localhost:8081/api/packages'

export async function getAllPackages() {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Failed to fetch packages')
    return res.json()
}

export async function getPackageById(id) {
    const res = await fetch(`${BASE_URL}/${id}`)
    if (!res.ok) throw new Error('Package not found')
    return res.json()
}

export async function getFilteredPackages(params) {
    const query = new URLSearchParams()
    if (params.destination) query.append('destination', params.destination)
    if (params.category)    query.append('category',    params.category)
    if (params.minPrice)    query.append('minPrice',    params.minPrice)
    if (params.maxPrice)    query.append('maxPrice',    params.maxPrice)
    const res = await fetch(`${BASE_URL}/filter?${query}`)
    if (!res.ok) throw new Error('Filter failed')
    return res.json()
}

export async function createPackage(data) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create package')
    return res.json()
}

export async function updatePackage(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to update package')
    return res.json()
}

export async function deletePackage(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete package')
}

export async function getPackageSummary(id) {
    const res = await fetch(`${BASE_URL}/${id}/summary`)
    if (!res.ok) throw new Error('Not found')
    return res.text()
}
