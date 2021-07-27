import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  padding: ${props => {
    if (props.small) return '5px 20px'
    if (props.large) return '15px 60px'
    return '11px 55px'
  }};
  font-size: 1rem;
  line-height: 1.35em;
  border: none;
  position: relative;
  text-transform: uppercase;
  overflow: hidden;
  margin: 4px 1px;
  border-radius: .4285rem;
  cursor: pointer;
  background: ${props => {
    if (props.primary) return '#e14eca'
    if (props.info) return '#1d8cf8'
    if (props.success) return '#00f2c3'
    if (props.warning) return '#ff8d72'
    if (props.danger) return '#fd5d93'
    if (props.neutral) return '#fff'
    return '#344675'
  }};
  background-image: ${props => {
    if (props.primary) return 'linear-gradient(to bottom left,#e14eca,#ba54f5,#e14eca)'
    if (props.info) return 'linear-gradient(to bottom left,#1d8cf8,#3358f4,#1d8cf8)'
    if (props.success) return 'linear-gradient(to bottom left,#00f2c3,#0098f0,#00f2c3)'
    if (props.warning) return 'linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72)'
    if (props.danger) return 'linear-gradient(to bottom left,#fd5d93,#ec250d,#fd5d93)'
    if (props.neutral) return 'linear-gradient(to bottom left,#fff,#fff,#fff)'
    return 'linear-gradient(to bottom left, #344675, #263148, #344675)'
  }};
  background-size: 210% 210%;
  background-position: 100% 0;
  background-color: ${props => {
    if (props.primary) return '#e14eca'
    if (props.info) return '#1d8cf8'
    if (props.success) return '#00f2c3'
    if (props.warning) return '#ff8d72'
    if (props.danger) return '#fd5d93'
    if (props.neutral) return '#fff'
    return '#344675'
  }};
  transition: all .15s ease;
  box-shadow: none;
  color: ${props => {
    if (props.neutral) return '#344675'
    return '#fff'
  }};
  width: fit-content;

  &:hover {
    box-shadow: 2px 2px 6px rgb(0 0 0 / 40%);
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: none !important;
    transform: translateY(1px) !important;
    transition: all .15s ease;

  }
`;

export default Button;