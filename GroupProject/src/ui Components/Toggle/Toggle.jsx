export default function Toggle({ value, onChange }) {
    return (
        <div
            onClick={() => onChange(!value)}
            style={{
                width: '42px',
                height: '22px',
                background: value ? '#22c55e' : '#ccc',
                borderRadius: '999px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute',
                top: '3px',
                left: value ? '21px' : '3px',  // ← fixed position values
                width: '16px',
                height: '16px',
                background: 'white',
                borderRadius: '50%',
                transition: 'left 0.2s',
            }} />
        </div>
    );
}