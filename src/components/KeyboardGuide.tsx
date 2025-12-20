import './KeyboardGuide.css';

const KeyboardGuide = () => {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const homeRowKeys = ['A', 'S', 'D', 'F', 'J', 'K', 'L'];

    return (
        <div className="keyboard-guide">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map(key => (
                        <div
                            key={key}
                            className={`key ${homeRowKeys.includes(key) ? 'home-row-key' : ''}`}
                        >
                            {key}
                            {key === 'F' || key === 'J' ? <span className="bump">•</span> : null}
                        </div>
                    ))}
                </div>
            ))}
            <div className="keyboard-row">
                <div className="key spacebar">SPACE</div>
            </div>
        </div>
    );
};

export default KeyboardGuide;