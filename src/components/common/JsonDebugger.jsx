
export const JsonDebugger = ({ data }) => {
  const [ toggle, setToggle ] = useState(false)

  const handleToggle = () => setToggle(s => !s);

  const s = {
    backgroundColor: '#edf2f7',
    padding: '10px',
    display: 'flex',
    flexDirecton: 'column',
    gap: '.2rem',
    justifyContent: 'center',
    alignContent: 'center'
  }

  return (
    <div style={s}>
      <button style={{ height: "18px", textAlign: 'center'}} onClick={handleToggle}>x</button>
      { toggle && <pre>{ JSON.stringify(data, null, 2) }</pre>}
    </div>
  )
};
