type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination: React.FC<Props> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="callsContainer__pagination">
    <button onClick={onPrev} disabled={page === 1}>Prev</button>
    <span>Page {page} of {totalPages}</span>
    <button onClick={onNext} disabled={page === totalPages}>Next</button>
  </div>
);

export default Pagination;