// ─── Config ────────────────────────────────────────────────────────────────

export const workTypeConfig = [
  { value: 'cleaning',          label: 'House Cleaning',  icon: '🧹' },
  { value: 'deep_cleaning',     label: 'Deep Cleaning',   icon: '✨' },
  { value: 'cooking',           label: 'Cooking',         icon: '🍳' },
  { value: 'babysitting',       label: 'Babysitting',     icon: '👶' },
  { value: 'elderly_care',      label: 'Elderly Care',    icon: '🤝' },
  { value: 'gardening',         label: 'Gardening',       icon: '🌿' },
  { value: 'laundry',           label: 'Laundry',         icon: '👕' },
  { value: 'pet_care',          label: 'Pet Care',        icon: '🐾' },
  { value: 'house_maintenance', label: 'Maintenance',     icon: '🔧' },
  { value: 'organizing',        label: 'Organizing',      icon: '📦' },
  { value: 'tutoring',          label: 'Tutoring',        icon: '📚' },
  { value: 'driver',            label: 'Driver',          icon: '🚗' },
]

export const urgencyConfig = [
  { value: 'low',    label: 'Flexible',   desc: 'Open schedule · 15% off', multiplier: 0.85 },
  { value: 'normal', label: 'Standard',   desc: 'Regular booking',         multiplier: 1.0  },
  { value: 'high',   label: 'Priority',   desc: 'Fast dispatch · +35%',    multiplier: 1.35 },
  { value: 'urgent', label: 'Emergency',  desc: 'Same-day · +75%',         multiplier: 1.75 },
]

const baseRates = {
  cleaning: 200, cooking: 250, babysitting: 180, elderly_care: 300,
  gardening: 220, laundry: 150, pet_care: 180, house_maintenance: 350,
  deep_cleaning: 280, organizing: 260, tutoring: 400, driver: 200,
}

export const workTypeEncoding = {
  cleaning: 0, cooking: 1, babysitting: 2, elderly_care: 3,
  gardening: 4, laundry: 5, pet_care: 6, house_maintenance: 7,
  deep_cleaning: 8, organizing: 9, tutoring: 10, driver: 11,
}

export const urgencyEncoding = { low: 0, normal: 1, high: 2, urgent: 3 }

// ─── Feature engineering ───────────────────────────────────────────────────

export const createFeatures = ([wt, rating, exp, urg]) => [
  wt, rating, exp, urg,
  rating * rating,
  exp * rating,
  Math.sqrt(exp),
  urg * rating,
]

// ─── Dataset generation ────────────────────────────────────────────────────

export const generateDataset = () => {
  const workTypes   = Object.keys(baseRates)
  const urgencyLevels = ['low', 'normal', 'high', 'urgent']
  const urgencyMultipliers = { low: 0.85, normal: 1.0, high: 1.35, urgent: 1.75 }
  const data = []

  for (let i = 0; i < 5000; i++) {
    const workType = workTypes[Math.floor(Math.random() * workTypes.length)]

    const ratingRand = Math.random()
    let rating
    if      (ratingRand < 0.05) rating = 3.0 + Math.random() * 0.5
    else if (ratingRand < 0.25) rating = 3.5 + Math.random() * 0.5
    else if (ratingRand < 0.60) rating = 4.0 + Math.random() * 0.5
    else                        rating = 4.5 + Math.random() * 0.5
    rating = Math.round(rating * 10) / 10

    const expRand = Math.random()
    let experience
    if      (expRand < 0.30) experience = Math.floor(Math.random() * 2)  + 1
    else if (expRand < 0.55) experience = Math.floor(Math.random() * 3)  + 3
    else if (expRand < 0.80) experience = Math.floor(Math.random() * 5)  + 6
    else                     experience = Math.floor(Math.random() * 10) + 11

    const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)]

    const baseRate           = baseRates[workType]
    const expFactor          = 1 + (Math.log(experience + 1) / Math.log(21)) * 0.8
    const ratingFactor       = 0.7 + ((rating - 3) / 2) * 0.8
    const urgencyFactor      = urgencyMultipliers[urgency]
    const specializationBonus = ['elderly_care', 'tutoring', 'house_maintenance'].includes(workType)
      ? 1 + Math.random() * 0.2 : 1
    const marketNoise  = 0.92 + Math.random() * 0.16
    const timePremium  = Math.random() < 0.2 ? 1.15 : 1
    const hourlyRate   = Math.round(
      baseRate * expFactor * ratingFactor * urgencyFactor * specializationBonus * marketNoise * timePremium * 100
    ) / 100

    data.push({
      workType, rating, experience, urgency,
      hourlyRate: Math.max(hourlyRate, baseRate * 0.6),
    })
  }
  return data
}

// ─── Linear algebra helpers ────────────────────────────────────────────────

const transpose = (m) => m[0].map((_, i) => m.map(r => r[i]))
const matMul    = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((s, _, k) => s + a[i][k] * b[k][j], 0)))
const matVec    = (m, v) => m.map(r => r.reduce((s, val, i) => s + val * v[i], 0))

const matInv = (matrix) => {
  const n   = matrix.length
  const id  = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0))
  const aug = matrix.map((r, i) => [...r, ...id[i]])

  for (let i = 0; i < n; i++) {
    let maxRow = i
    for (let k = i + 1; k < n; k++)
      if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k
    ;[aug[i], aug[maxRow]] = [aug[maxRow], aug[i]]
    for (let k = i + 1; k < n; k++) {
      const f = aug[k][i] / aug[i][i]
      for (let j = i; j < 2 * n; j++) aug[k][j] -= f * aug[i][j]
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    for (let k = i - 1; k >= 0; k--) {
      const f = aug[k][i] / aug[i][i]
      for (let j = 0; j < 2 * n; j++) aug[k][j] -= f * aug[i][j]
    }
  }
  for (let i = 0; i < n; i++) {
    const d = aug[i][i]
    for (let j = 0; j < 2 * n; j++) aug[i][j] /= d
  }
  return aug.map(r => r.slice(n))
}

// ─── Model training ────────────────────────────────────────────────────────

export const trainModel = (data) => {
  const X  = data.map(d => createFeatures([
    workTypeEncoding[d.workType], d.rating, d.experience, urgencyEncoding[d.urgency],
  ]))
  const y  = data.map(d => d.hourlyRate)
  const Xb = X.map(r => [1, ...r])
  const XT = transpose(Xb)
  const XTX = matMul(XT, Xb)
  const lambda = 0.01
  for (let i = 0; i < XTX.length; i++) XTX[i][i] += lambda
  const theta = matVec(matMul(matInv(XTX), XT), y)
  return { theta }
}

// ─── Prediction ────────────────────────────────────────────────────────────

export const predict = (model, { workType, rating, experience, urgency }) => {
  const features = [1, ...createFeatures([
    workTypeEncoding[workType],
    parseFloat(rating),
    parseInt(experience),
    urgencyEncoding[urgency],
  ])]
  const rate = features.reduce((s, v, i) => s + v * model.theta[i], 0)
  return Math.max(Math.round(rate), 10)
}
