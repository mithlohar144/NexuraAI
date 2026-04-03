import React from 'react'

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
}

const dialogStyle = {
  width: '100%',
  maxWidth: 360,
  backgroundColor: 'var(--ink2)',
  borderRadius: 10,
  border: '1px solid var(--rule2)',
  boxShadow: '0 18px 45px rgba(0,0,0,0.55)',
  padding: '18px 20px 16px',
  color: 'var(--smoke)',
  fontFamily: 'Outfit, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const titleStyle = {
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 6,
}

const messageStyle = {
  fontSize: 13,
  lineHeight: 1.5,
  color: 'var(--smoke2)',
  marginBottom: 14,
}

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
}

const btnBase = {
  minWidth: 72,
  height: 32,
  borderRadius: 999,
  border: '1px solid transparent',
  fontSize: 12,
  padding: '0 14px',
  cursor: 'pointer',
  fontFamily: 'Space Mono, monospace',
  letterSpacing: 1,
  textTransform: 'uppercase',
}

const cancelBtnStyle = {
  ...btnBase,
  backgroundColor: 'transparent',
  borderColor: 'var(--rule2)',
  color: 'var(--smoke3)',
}

const confirmBtnStyle = {
  ...btnBase,
  backgroundImage: 'linear-gradient(135deg, var(--o2), var(--o4))',
  color: 'var(--smoke)',
  borderColor: 'rgba(255,102,0,0.55)',
}

const ConfirmDialog = ({
  open,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={messageStyle}>{message}</div>
        <div style={actionsStyle}>
          <button
            type="button"
            style={cancelBtnStyle}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            style={confirmBtnStyle}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
