import { useState } from 'react'
import './App.css'

function App() {
  const [citations, setCitations] = useState([
    {
      id: 1,
      author: 'Smith, J.',
      year: 2023,
      title: 'Understanding React Hooks',
      source: 'Journal of Web Development'
    }
  ])
  const [formData, setFormData] = useState({
    author: '',
    year: '',
    title: '',
    source: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.author && formData.year && formData.title && formData.source) {
      const newCitation = {
        id: Date.now(),
        ...formData,
        year: parseInt(formData.year)
      }
      setCitations([...citations, newCitation])
      setFormData({ author: '', year: '', title: '', source: '' })
    }
  }

  const deleteCitation = (id) => {
    setCitations(citations.filter(citation => citation.id !== id))
  }

  return (
    <div className="app">
      <header>
        <h1>📚 Citations Manager</h1>
        <p>Organize your research references</p>
      </header>

      <main>
        <section className="add-citation">
          <h2>Add New Citation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="e.g., Smith, J."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g., 2023"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Understanding React Hooks"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="source">Source:</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="e.g., Journal of Web Development"
                required
              />
            </div>
            <button type="submit" className="btn-add">Add Citation</button>
          </form>
        </section>

        <section className="citations-list">
          <h2>Your Citations ({citations.length})</h2>
          {citations.length === 0 ? (
            <p className="no-citations">No citations yet. Add your first citation above!</p>
          ) : (
            <ul>
              {citations.map(citation => (
                <li key={citation.id} className="citation-item">
                  <div className="citation-content">
                    <strong>{citation.author}</strong> ({citation.year}). 
                    <em> {citation.title}</em>. {citation.source}.
                  </div>
                  <button 
                    onClick={() => deleteCitation(citation.id)}
                    className="btn-delete"
                    aria-label="Delete citation"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
