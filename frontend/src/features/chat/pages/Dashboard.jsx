import React, { useEffect, useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'
import { useChat } from '../hook/useChat'
import ConfirmDialog from '../component/ConfirmDialog'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hook/useAuth'

/* ─── Typewriter hook for USER messages ─────────────────────────────────────
   Reveals text character by character, like someone typing in real time.      */
const useTypewriter = (text, speed = 28, enabled = true) => {
  const [displayed, setDisplayed] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true) }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, enabled])

  return { displayed, done }
}

/* ─── Word-stream hook for AI messages ──────────────────────────────────────
   Reveals word by word with a slight stagger, mimicking streaming output.     */
const useWordStream = (text, delay = 38, enabled = true) => {
  const [visibleCount, setVisibleCount] = useState(enabled ? 0 : Infinity)
  const [done, setDone] = useState(!enabled)
  const words = text.split(' ')

  useEffect(() => {
    if (!enabled) { setVisibleCount(Infinity); setDone(true); return }
    setVisibleCount(0)
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= words.length) { clearInterval(id); setDone(true) }
    }, delay)
    return () => clearInterval(id)
  }, [text, delay, enabled])

  const displayed = words.slice(0, visibleCount).join(' ')
  return { displayed, done }
}

/* ─── User Message Component ────────────────────────────────────────────────*/
const UserMessage = ({ content, animate }) => {
  const { displayed, done } = useTypewriter(content, 25, animate)
  return (
    <div className="mrow user">
      <div className="bubble ubub">
        <p>
          {displayed}
          {!done && <span className="user-cursor">|</span>}
        </p>
      </div>
      <div className="av av-me">ME</div>
    </div>
  )
}

/* ─── AI Message Component ──────────────────────────────────────────────────*/
const AiMessage = ({ content, animate }) => {
  const { displayed, done } = useWordStream(content, 35, animate)
  return (
    <div className="mrow assistant">
      <div className="av av-ai">AI</div>
      <div className="bubble">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p>{children}</p>,
            ul: ({ children }) => <ul>{children}</ul>,
            ol: ({ children }) => <ol>{children}</ol>,
            code: ({ children }) => <code>{children}</code>,
            pre: ({ children }) => <pre>{children}</pre>,
          }}
          remarkPlugins={[remarkGfm]}
        >
          {displayed}
        </ReactMarkdown>
        {!done && <span className="ai-cursor">▋</span>}
      </div>
    </div>
  )
}

/* ─── AI Thinking Indicator ─────────────────────────────────────────────────*/
const ThinkingRow = () => (
  <div className="mrow assistant">
    <div className="av av-ai">AI</div>
    <div className="bubble thinking-wrap">
      <span className="thinking-dot" style={{ animationDelay: '0ms' }} />
      <span className="thinking-dot" style={{ animationDelay: '160ms' }} />
      <span className="thinking-dot" style={{ animationDelay: '320ms' }} />
    </div>
  </div>
)

/* ─── Dashboard ─────────────────────────────────────────────────────────────*/
const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [chatToDelete, setChatToDelete] = useState(null)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  const authUser = useSelector((state) => state.auth.user)
  // Track which message IDs have already been animated so replays don't re-animate
  const [animatedIds] = useState(() => new Set())
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const messagesEndRef = useRef(null)
  const prevMsgCount = useRef(0)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const trimmed = chatInput.trim()
    if (!trimmed) return
    chat.handleSendMessage({ message: trimmed, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }
  const messages = chats[currentChatId]?.messages || []
  const chatTitle = chats[currentChatId]?.title || 'New Thread'

  // Mark newest message for animation, skip all prior ones
  const getAnimated = useCallback((id) => {
    if (animatedIds.has(id)) return false
    animatedIds.add(id)
    return true
  }, [animatedIds])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --o1:#ff6600; --o2:#e05a00; --o3:#c24e00; --o4:#a34100; --o5:#853500;
          --ink:#080610; --ink2:#0e0b18; --ink3:#161220; --ink4:#1e192c;
          --smoke:#f5f0eb; --smoke2:rgba(245,240,235,0.65); --smoke3:rgba(245,240,235,0.28);
          --smoke4:rgba(245,240,235,0.10); --rule:rgba(245,240,235,0.07); --rule2:rgba(245,240,235,0.13);
        }
        .root { width:100%; min-height:100vh; background:var(--ink); font-family:'Outfit',sans-serif; color:var(--smoke); display:flex; overflow:hidden; }

        /* ── SIDEBAR ── */
        .sb { width:260px; flex-shrink:0; height:100vh; overflow:hidden; transition:width 0.3s cubic-bezier(.4,0,.2,1); background:var(--ink2); border-right:1px solid var(--rule2); display:flex; flex-direction:column; position:relative; }
        .sb.closed { width:0; }
        .sb::after { content:''; position:absolute; top:0; right:0; width:1px; height:100%; background:linear-gradient(180deg,var(--o1) 0%,var(--o5) 40%,transparent 100%); opacity:0.4; }
        .sb-inner { width:260px; height:100%; display:flex; flex-direction:column; overflow:hidden; }
        .sb-logo { padding:28px 22px 20px; border-bottom:1px solid var(--rule); flex-shrink:0; }
        .sb-wordmark { font-family:'Space Mono',monospace; font-size:14px; font-weight:700; color:var(--o1); letter-spacing:4px; text-transform:uppercase; display:block; }
        .sb-sub { font-size:9.5px; color:var(--smoke3); letter-spacing:2px; text-transform:uppercase; margin-top:5px; font-family:'Space Mono',monospace; }
        .sb-sec { font-size:9px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--smoke3); padding:16px 22px 8px; flex-shrink:0; }
        .sb-list { flex:1; overflow-y:auto; padding:0 10px 10px; }
        .sb-list::-webkit-scrollbar { width:2px; }
        .sb-list::-webkit-scrollbar-thumb { background:var(--rule2); }
        .sb-item { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:6px; cursor:pointer; font-size:13px; color:var(--smoke2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; border:1px solid transparent; transition:all 0.15s; margin-bottom:2px; }
        .sb-title { flex:1; overflow:hidden; text-overflow:ellipsis; }
        .sb-item:hover { background:var(--smoke4); color:var(--smoke); border-color:var(--rule2); }
        .sb-item.active { background:rgba(255,102,0,0.10); border-color:rgba(255,102,0,0.25); color:var(--smoke); }
        .sb-dot { width:6px; height:6px; border-radius:50%; background:var(--smoke3); flex-shrink:0; }
        .sb-item.active .sb-dot { background:var(--o1); box-shadow:0 0 6px var(--o1); }
        .sb-delbtn { width:20px; height:20px; border-radius:4px; border:none; background:transparent; display:flex; align-items:center; justify-content:center; color:var(--smoke3); flex-shrink:0; cursor:pointer; padding:0; }
        .sb-delbtn:hover { color:#f97373; background:rgba(248,113,113,0.05); }
        .sb-newbtn { margin:10px; padding:11px 14px; border-radius:6px; border:1px solid var(--rule2); background:transparent; color:var(--smoke3); font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1px; cursor:pointer; display:flex; align-items:center; gap:8px; transition:all 0.15s; text-transform:uppercase; }
        .sb-newbtn:hover { border-color:var(--o1); color:var(--o1); background:rgba(255,102,0,0.05); }

        /* ── MAIN ── */
        .main { flex:1; min-width:0; height:100vh; display:flex; flex-direction:column; background:var(--ink); }

        /* ── TOPBAR ── */
        .topbar { height:56px; flex-shrink:0; display:flex; align-items:center; padding:0 24px; border-bottom:1px solid var(--rule); gap:14px; position:relative; z-index:40; background:var(--ink); }
        .topbar::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--o1),transparent); opacity:0.2; }
        .menubtn { width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; border:1px solid var(--rule2); border-radius:6px; background:transparent; color:var(--smoke2); flex-shrink:0; transition:all 0.15s; }
        .menubtn:hover { border-color:var(--o1); color:var(--o1); background:rgba(255,102,0,0.06); }
        .tb-thread { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:var(--smoke3); flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .tb-thread em { color:var(--o1); font-style:normal; }
        .tb-status { display:flex; align-items:center; gap:6px; font-family:'Space Mono',monospace; font-size:10px; color:var(--smoke3); letter-spacing:1px; flex-shrink:0; }
        .tb-account-wrap { position:relative; margin-left:12px; }
        .tb-account-btn { display:flex; align-items:center; gap:6px; border-radius:999px; border:1px solid var(--rule2); padding:4px 10px; font-family:'Space Mono',monospace; font-size:9px; letter-spacing:1.4px; text-transform:uppercase; background:transparent; color:var(--smoke3); cursor:pointer; transition:all 0.15s; }
        .tb-account-btn:hover { border-color:var(--o1); color:var(--o1); background:rgba(255,102,0,0.06); }
        .tb-account-avatar { width:18px; height:18px; border-radius:999px; background:linear-gradient(135deg,var(--o2),var(--o4)); color:var(--smoke); display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:600; }
        .tb-account-chevron { font-size:9px; }
        .tb-account-menu { position:absolute; right:0; top:120%; min-width:150px; border-radius:10px; border:1px solid var(--rule2); background:var(--ink2); box-shadow:0 16px 40px rgba(0,0,0,0.6); padding:6px 0; z-index:50; }
        .tb-account-item { width:100%; padding:6px 12px; background:transparent; border:none; text-align:left; font-family:'Space Mono',monospace; font-size:9px; letter-spacing:1.4px; text-transform:uppercase; color:var(--smoke3); cursor:pointer; display:flex; align-items:center; justify-content:space-between; }
        .tb-account-item:hover { background:rgba(255,102,0,0.06); color:var(--o1); }
        .sdot { width:5px; height:5px; border-radius:50%; background:#22c55e; box-shadow:0 0 6px #22c55e; animation:blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── MESSAGES ── */
        .msgs { flex:1; overflow-y:auto; padding:32px 0 16px; display:flex; flex-direction:column; }
        .msgs::-webkit-scrollbar { width:3px; }
        .msgs::-webkit-scrollbar-thumb { background:var(--rule2); }
        .mrow { display:flex; align-items:flex-start; padding:16px 32px; animation:fu 0.2s ease forwards; }
        @keyframes fu { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        .mrow.user { background:rgba(255,102,0,0.04); border-top:1px solid rgba(255,102,0,0.08); border-bottom:1px solid rgba(255,102,0,0.08); justify-content:flex-end; margin:8px 0; }
        .av { width:28px; height:28px; border-radius:4px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:9px; font-weight:700; margin-top:2px; }
        .av-ai { background:var(--ink3); border:1px solid rgba(255,102,0,0.3); color:var(--o1); margin-right:14px; }
        .av-me { background:linear-gradient(135deg,var(--o2),var(--o4)); color:var(--smoke); margin-left:14px; order:2; }

        /* Bubbles */
        .bubble { max-width:680px; font-size:14.5px; line-height:1.72; color:var(--smoke2); font-weight:300; }
        .bubble.ubub { color:var(--smoke); font-weight:400; font-size:15px; max-width:560px; }
        .bubble p { margin-bottom:10px; }
        .bubble p:last-child { margin-bottom:0; }
        .bubble ul { list-style:none; padding-left:0; margin-bottom:10px; }
        .bubble ul li { padding-left:16px; position:relative; margin-bottom:4px; }
        .bubble ul li::before { content:'—'; position:absolute; left:0; color:var(--o2); }
        .bubble ol { list-style:decimal; padding-left:20px; margin-bottom:10px; }
        .bubble code { font-family:'Space Mono',monospace; font-size:12px; background:rgba(255,102,0,0.08); border:1px solid rgba(255,102,0,0.18); color:#ffb87a; padding:1px 6px; border-radius:3px; }
        .bubble pre { background:var(--ink2); border:1px solid var(--rule2); border-left:2px solid var(--o3); border-radius:4px; padding:14px 16px; overflow-x:auto; margin:12px 0; font-family:'Space Mono',monospace; font-size:12px; line-height:1.6; }
        .bubble pre code { background:none; border:none; padding:0; color:#e8d5b8; }

        /* ── TYPING CURSORS ── */
        /* User: blinking pipe cursor, orange tint */
        .user-cursor {
          display:inline-block;
          color:var(--o1);
          font-weight:300;
          margin-left:1px;
          animation:cur-blink 0.6s step-end infinite;
        }
        @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* AI: block cursor that blinks */
        .ai-cursor {
          display:inline-block;
          color:var(--o2);
          font-size:13px;
          margin-left:2px;
          vertical-align:middle;
          animation:block-blink 0.75s step-end infinite;
        }
        @keyframes block-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── THINKING DOTS ── */
        .thinking-wrap { display:flex; align-items:center; gap:6px; padding:6px 0; }
        .thinking-dot {
          width:7px; height:7px; border-radius:50%;
          background:var(--o3);
          animation:tdot 1.2s ease-in-out infinite;
        }
        @keyframes tdot {
          0%,80%,100% { transform:scale(0.7); opacity:0.35; }
          40%          { transform:scale(1.15); opacity:1; background:var(--o1); }
        }

        /* ── EMPTY ── */
        .empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:60px 40px; }
        .empty-sym { font-family:'Space Mono',monospace; font-size:52px; color:var(--o1); opacity:0.22; line-height:1; animation:flicker 4s ease-in-out infinite; }
        @keyframes flicker { 0%,100%{opacity:0.22} 45%{opacity:0.18} 50%{opacity:0.32} 55%{opacity:0.18} }
        .empty-h { font-family:'Space Mono',monospace; font-size:12px; letter-spacing:4px; text-transform:uppercase; color:var(--smoke3); }
        .egrid { display:grid; grid-template-columns:1fr 1fr; gap:8px; max-width:500px; width:100%; margin-top:8px; }
        .ecard { padding:12px 16px; border:1px solid var(--rule2); border-radius:6px; background:var(--ink2); cursor:pointer; transition:all 0.15s; }
        .ecard:hover { border-color:rgba(255,102,0,0.3); background:rgba(255,102,0,0.06); }
        .ecard-lbl { font-size:9.5px; letter-spacing:1.5px; text-transform:uppercase; color:var(--o2); font-family:'Space Mono',monospace; margin-bottom:4px; }
        .ecard-txt { font-size:13px; color:var(--smoke2); line-height:1.4; }

        /* ── INPUT ── */
        .inarea { flex-shrink:0; padding:16px 32px 24px; background:var(--ink); border-top:1px solid var(--rule); position:relative; }
        .inarea::before { content:''; position:absolute; top:0; left:60px; right:60px; height:1px; background:linear-gradient(90deg,transparent,rgba(255,102,0,0.35),transparent); }
        .inwrap { display:flex; gap:10px; align-items:flex-end; max-width:860px; margin:0 auto; }
        .inbox { flex:1; background:var(--ink3); border:1px solid var(--rule2); border-radius:8px; padding:13px 16px; font-family:'Outfit',sans-serif; font-size:14.5px; font-weight:300; color:var(--smoke); outline:none; resize:none; transition:border-color 0.2s,box-shadow 0.2s; line-height:1.5; min-height:48px; max-height:160px; }
        .inbox::placeholder { color:var(--smoke3); }
        .inbox:focus { border-color:rgba(255,102,0,0.45); box-shadow:0 0 0 3px rgba(255,102,0,0.07); }
        .sendbtn { width:48px; height:48px; border-radius:8px; border:1px solid var(--o3); background:var(--ink3); color:var(--o1); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.15s; flex-shrink:0; }
        .sendbtn:hover:not(:disabled) { background:rgba(255,102,0,0.12); border-color:var(--o1); box-shadow:0 0 16px rgba(255,102,0,0.2); }
        .sendbtn:disabled { opacity:0.3; cursor:not-allowed; border-color:var(--rule2); color:var(--smoke3); }
        .inmeta { max-width:860px; margin:8px auto 0; display:flex; justify-content:space-between; align-items:center; }
        .inmeta span { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1px; color:var(--smoke3); text-transform:uppercase; }

        /* ── WORKSPACE LAYOUT (Home-style) ── */
        .ws-main-inner {
          max-width:1040px;
          margin:24px auto 32px;
          padding:0 24px 32px;
          display:flex;
          flex-direction:column;
          gap:24px;
        }
        .ws-hero-title {
          font-size:26px;
          font-weight:600;
          letter-spacing:0.02em;
          color:var(--smoke);
        }
        .ws-hero-sub {
          margin-top:4px;
          font-size:13px;
          color:var(--smoke2);
        }
        .ws-input-card {
          border-radius:20px;
          background:radial-gradient(circle at top left,rgba(255,102,0,0.14),transparent 55%),var(--ink3);
          border:1px solid var(--rule2);
          padding:14px 14px 10px;
          box-shadow:0 24px 80px rgba(0,0,0,0.85);
        }
        .ws-input-card .inwrap {
          background:var(--ink4);
          border-radius:16px;
          border:1px solid var(--rule2);
          padding:10px 10px 10px 14px;
        }
        .ws-input-card .inbox {
          background:transparent;
          border:none;
          box-shadow:none;
          min-height:64px;
        }
        .ws-input-card .sendbtn {
          background:var(--o1);
          border-color:var(--o1);
          color:#050014;
        }
        .ws-input-card .sendbtn:hover:not(:disabled) {
          background:#ff7a1a;
        }
        .ws-input-footer {
          margin-top:10px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 2px;
        }
        .ws-tools-btn {
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:5px 10px;
          border-radius:999px;
          border:1px solid var(--rule2);
          background:rgba(8,6,16,0.9);
          color:var(--smoke3);
          font-family:'Space Mono',monospace;
          font-size:10px;
          letter-spacing:1.5px;
          text-transform:uppercase;
          cursor:pointer;
        }
        .ws-tools-btn:hover {
          border-color:var(--o1);
          color:var(--o1);
        }
        .ws-input-hint {
          font-family:'Space Mono',monospace;
          font-size:10px;
          letter-spacing:1px;
          color:var(--smoke3);
          text-transform:uppercase;
        }
        .ws-actions-row {
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }
        .ws-action-pill {
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:6px 10px;
          border-radius:999px;
          border:1px solid var(--rule);
          background:rgba(8,6,16,0.95);
          color:var(--smoke2);
          font-size:11px;
          cursor:pointer;
        }
        .ws-action-pill span {
          font-size:13px;
        }
        .ws-suggestions {
          margin-top:4px;
        }
        .ws-suggestions-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
          font-size:12px;
          color:var(--smoke2);
        }
        .ws-view-all {
          border:none;
          background:transparent;
          color:var(--smoke3);
          font-size:11px;
          cursor:pointer;
        }
        .ws-chat-transcript {
          margin-top:8px;
          border-radius:18px;
          border:1px solid var(--rule2);
          background:rgba(8,6,16,0.85);
          overflow:hidden;
        }
        .ws-chat-transcript .msgs {
          padding:20px 0 6px;
        }

        @media(max-width:768px) {
          .root { flex-direction:column; }
          .sb { position:fixed; top:0; bottom:0; left:0; z-index:30; width:260px; transform:translateX(-100%); opacity:0; pointer-events:none; transition:transform 0.25s ease, opacity 0.25s ease; }
          .sb.closed { transform:translateX(-100%); opacity:0; pointer-events:none; }
          .sb:not(.closed) { transform:translateX(0); opacity:1; pointer-events:auto; }
          .sb-inner { box-shadow:12px 0 32px rgba(0,0,0,0.65); }
          .mrow { padding:12px 14px; }
          .inarea { padding:10px 12px 14px; }
          .topbar { padding:0 12px; }
          .bubble { max-width:100%; font-size:14px; }
          .bubble.ubub { max-width:100%; font-size:14px; }
          .empty { padding:40px 20px; }
          .egrid { grid-template-columns:1fr; }
          .inwrap { max-width:100%; }
        }
      `}</style>

      <div className="root">
        {/* ── Sidebar ── */}
        <nav className={`sb${sidebarOpen ? '' : ' closed'}`}>
          <div className="sb-inner">
            <div className="sb-logo">
              <span className="sb-wordmark">Nexura</span>
              <span className="sb-sub">v1.0 — research mode</span>
            </div>
            <div className="sb-sec">Threads</div>
            <div className="sb-list">
              {Object.values(chats).map((c, i) => (
                <div
                  key={i}
                  className={`sb-item${currentChatId === c.id ? ' active' : ''}`}
                  onClick={() => openChat(c.id)}
                >
                  <span className="sb-dot" />
                  <span className="sb-title">
                    {c.title.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </span>
                  <button
                    type="button"
                    className="sb-delbtn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setChatToDelete(c.id)
                      setConfirmOpen(true)
                    }}
                    aria-label="Delete chat"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6l1-2h4l1 2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              className="sb-newbtn"
              type="button"
              onClick={() => {
                chat.handleNewThread()
                setChatInput('')
                if (window.innerWidth <= 768) {
                  setSidebarOpen(false)
                }
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Thread
            </button>
          </div>
        </nav>

        {/* ── Main ── */}
        <div className="main">
          <div className="topbar">
            <button className="menubtn" type="button" onClick={() => setSidebarOpen(p => !p)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="tb-thread"><em>// </em>{chatTitle}</div>
            <div className="tb-status">
              <div className="sdot" />online
              <div className="tb-account-wrap">
                <button
                  type="button"
                  className="tb-account-btn"
                  onClick={() => setAccountMenuOpen(o => !o)}
                >
                  <div className="tb-account-avatar">
                    {(authUser?.username || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <span>{authUser?.username || 'Account'}</span>
                  <span className="tb-account-chevron">▾</span>
                </button>
                {accountMenuOpen && (
                  <div className="tb-account-menu">
                    <button
                      type="button"
                      className="tb-account-item"
                      onClick={() => {
                        setAccountMenuOpen(false)
                        navigate('/account')
                      }}
                    >
                      <span>Profile</span>
                    </button>
                    <button
                      type="button"
                      className="tb-account-item"
                      onClick={async () => {
                        setAccountMenuOpen(false)
                        await handleLogout()
                        navigate('/')
                      }}
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {messages.length > 0 ? (
            <div className="msgs">
              {messages.map((msg) => {
                const animate = getAnimated(msg.id)
                return msg.role === 'user'
                  ? <UserMessage key={msg.id} content={msg.content} animate={animate} />
                  : <AiMessage key={msg.id} content={msg.content} animate={animate} />
              })}
              {/* Show thinking dots when last message is from user (waiting for AI) */}
              {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <ThinkingRow />
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="empty">
              <div className="empty-sym">_</div>
              <div className="empty-h">What do you want to know?</div>
              <div className="egrid">
                {[
                  { label: 'Research', text: 'Deep-dive any topic with sources' },
                  { label: 'Write', text: 'Draft emails, essays, code, docs' },
                  { label: 'Analyze', text: 'Break down data or complex ideas' },
                  { label: 'Create', text: 'Brainstorm and build something new' },
                ].map((item, i) => (
                  <div key={i} className="ecard">
                    <div className="ecard-lbl">{item.label}</div>
                    <div className="ecard-txt">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Input ── */}
          <div className="inarea">
            <form onSubmit={handleSubmitMessage}>
              <div className="inwrap">
                <textarea
                  className="inbox"
                  rows={1}
                  value={chatInput}
                  placeholder="Enter your query..."
                  onChange={(e) => {
                    setChatInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitMessage(e)
                    }
                  }}
                />
                <button type="submit" disabled={!chatInput.trim()} className="sendbtn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <div className="inmeta">
                <span>↵ send · ⇧↵ newline</span>
                <span>{chatInput.length} chars</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete thread"
        message="Are you sure you want to delete this thread? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (chatToDelete) {
            chat.handleDeleteChat(chatToDelete)
          }
          setConfirmOpen(false)
          setChatToDelete(null)
        }}
        onCancel={() => {
          setConfirmOpen(false)
          setChatToDelete(null)
        }}
      />
    </>
  )
}

export default Dashboard