import './FingerPractice.css';

const FingerPractice = () => {
    const leftHand = [
        {finger: 'Pinky', key: 'A', color: '#ef4444'},
        {finger: 'Ring', key: 'S', color: '#f59e0b'},
        {finger: 'Middle', key: 'D', color: '#10b981'},
        {finger: 'Index', key: 'F', color: '#3b82f6'}
    ];

    const rightHand = [
        {finger: 'Index', key: 'J', color: '#3b82f6'},
        {finger: 'Middle', key: 'K', color: '#10b981'},
        {finger: 'Ring', key: 'L', color: '#f59e0b'},
        {finger: 'Pinky', key: ';', color: '#ef4444'}
    ];

    return (
        <div className="finger-practice">
            <div className="hands-display">
                <div className="hand left-hand">
                    <h3>Left Hand</h3>
                    <div className="fingers">
                        {leftHand.map(({finger, key, color}) => (
                            <div key={key} className="finger-item">
                                <div className="finger-key" style={{backgroundColor: color}}>
                                    {key}
                                </div>
                                <span className="finger-name">{finger}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hand right-hand">
                    <h3>Right Hand</h3>
                    <div className="fingers">
                        {rightHand.map(({finger, key, color}) => (
                            <div key={key} className="finger-item">
                                <div className="finger-key" style={{backgroundColor: color}}>
                                    {key}
                                </div>
                                <span className="finger-name">{finger}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FingerPractice;