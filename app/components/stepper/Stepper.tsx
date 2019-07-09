import { PRIMARY } from './../../styles/colors'
import Steps from 'antd/lib/steps'
import Icon from 'antd/lib/icon'
import './stepper.scss'

interface Step {
  content: any
  title: string
  icon: any
}

interface StepperProps {
  position?: number
  title?: string
  steps: Step[]
  prefixCls?: string
  iconPrefix?: string
  className?: string
  current?: number
  initial?: number
  labelPlacement?: 'horizontal' | 'vertical'
  status?: 'wait' | 'process' | 'finish' | 'error'
  size?: 'default' | 'small'
  direction?: 'horizontal' | 'vertical'
  progressDot?: boolean | Function
  style?: React.CSSProperties
  goBack?(): void
}

const Step = Steps.Step

export const Stepper = ({
  steps = [],
  position = 0,
  style,
  title,
  goBack
}: StepperProps) => {
  const titles = steps.map(({ title }) => title)

  const showBackButton = position > 0

  return (
    <div className="stepper-div">
      <div className="stepper">
        <h2
          style={{
            textAlign: 'center',
            fontSize: 36,
            fontWeight: 500,
            color: PRIMARY
          }}
        >
          {titles[position]}
        </h2>
        <Icon
          type="left"
          onClick={goBack}
          style={{
            position: 'absolute',
            display: showBackButton ? 'initial' : 'none',
            top: 20,
            left: 20,
            fontSize: 28,
            cursor: 'pointer',
            color: '#6f3733',
            borderRadius: 16,
            padding: 5,
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgb(199, 91, 82)'
          }}
        />
        <div style={{ margin: 'auto', maxWidth: 700 }}>
          <Steps current={position} size="small">
            {steps.map(({ content, icon, title, ...stepProps }) => (
              <Step
                key={title}
                // status="process"
                // icon={icon ? <Icon type={icon} /> : null}
                // icon={<Icon type="loading" />}
                {...stepProps}
              />
            ))}
          </Steps>
        </div>
      </div>
      <div className="content" style={{ marginTop: 20, ...style }}>
        {steps.map((s, i) => (
          <div key={i} className={position != i ? 'inactive' : ''}>
            {s.content}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Stepper
