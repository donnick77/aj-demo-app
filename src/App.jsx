import { useState, useEffect } from 'react'
import './App.css'

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="clock">
      <span className="clock-time">{now.toLocaleTimeString('ru-RU')}</span>
      <span className="clock-date">
        {now.toLocaleDateString('ru-RU', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </span>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="card">
      <h2>Счётчик</h2>
      <p className="muted">React-состояние работает в реальном времени</p>
      <div className="counter-row">
        <button onClick={() => setCount((c) => c - 1)} aria-label="Уменьшить">−</button>
        <span className="counter-value">{count}</span>
        <button onClick={() => setCount((c) => c + 1)} aria-label="Увеличить">+</button>
      </div>
    </div>
  )
}

function Todo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Написать сайт', done: true },
    { id: 2, text: 'Задеплоить на GitHub Pages', done: true },
    { id: 3, text: 'Заменить демо на ваше приложение', done: false },
  ])
  const [draft, setDraft] = useState('')

  const add = () => {
    const text = draft.trim()
    if (!text) return
    setItems((prev) => [...prev, { id: Date.now(), text, done: false }])
    setDraft('')
  }

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
    )

  return (
    <div className="card">
      <h2>Список дел</h2>
      <p className="muted">Клик по пункту — отметка выполнения</p>
      <ul className="todo">
        {items.map((i) => (
          <li key={i.id} className={i.done ? 'done' : ''} onClick={() => toggle(i.id)}>
            <span className="todo-check">{i.done ? '✓' : ''}</span>
            {i.text}
          </li>
        ))}
      </ul>
      <div className="todo-input">
        <input
          value={draft}
          placeholder="Новое дело…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button onClick={add}>Добавить</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <header className="hero">
        <p className="badge">React + Vite + GitHub Pages</p>
        <h1>Демо-приложение от AJ</h1>
        <p className="subtitle">
          Это живой SPA, задеплоенный на GitHub Pages. Здесь будет ваше
          веб-приложение — просто скажите, что нужно.
        </p>
        <Clock />
      </header>

      <main className="grid">
        <Counter />
        <Todo />
      </main>

      <footer className="footer">
        Собрано на React 18 + Vite · Деплой: GitHub Pages · Код в репозитории{' '}
        <a
          href="https://github.com/donnick77/aj-demo-app"
          target="_blank"
          rel="noreferrer"
        >
          donnick77/aj-demo-app
        </a>
      </footer>
    </div>
  )
}

export default App
