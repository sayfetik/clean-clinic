import { Button } from '../../components'

const ApplyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div style={{ marginTop: '20px' }}>
    <Button text="Применить" size="small" onClick={onClick} />
  </div>
)

export default ApplyButton
