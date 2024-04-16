// const Draggable = ({ children }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [relPos, setRelPos] = useState({ x: 0, y: 0 });
//
//   const handleMouseDown = useCallback(
//     (e) => {
//       setIsDragging(true);
//       setRelPos({
//         x: e.pageX - position.x,
//         y: e.pageY - position.y,
//       });
//       e.stopPropagation();
//       e.preventDefault();
//     },
//     [position.x, position.y]
//   );
//
//   const handleMouseMove = useCallback(
//     (e) => {
//       if (!isDragging) {
//         return;
//       }
//       setPosition({
//         x: e.pageX - relPos.x,
//         y: e.pageY - relPos.y,
//       });
//       e.stopPropagation();
//       e.preventDefault();
//     },
//     [isDragging, relPos]
//   );
//
//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);
//
//   return (
//     <div
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         position: "fixed",
//         cursor: "move",
//         userSelect: "none",
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {children}
//     </div>
//   );
// };
//
// return { Draggable };
//
