// This is a fixed div with the style prop to avoid weird
// flashes when navigating to an intercepted route. I assume this behavior
// is a bug and it would be nice to remove this component in the future.

export const ModalBoundary = ({ children }: any) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999999,
      }}
    >
      {children}
    </div>
  );
};
