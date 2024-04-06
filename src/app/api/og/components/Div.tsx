import { baseDiv } from './styles';

interface DivProps {
  style?: React.CSSProperties;
  children: any;
}

export const Div = ({ style, children }: DivProps) => {
  return (
    <div
      style={{
        ...baseDiv,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
