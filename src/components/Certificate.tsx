import { forwardRef } from 'react';

interface CertificateProps {
  name: string;
  date: string;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, date }, ref) => {
    return (
      <div className="certificate" ref={ref}>
        <div className="certificate__inner">
          <div className="certificate__border">
            <h2 className="certificate__title">雅思核心词汇</h2>
            <p className="certificate__subtitle">抄写完成证书</p>

            <div className="certificate__body">
              <p className="certificate__to">This certifies that</p>
              <p className="certificate__name">{name || 'Learner'}</p>
              <p className="certificate__desc">
                has completed all IELTS vocabulary copying practice
              </p>
            </div>

            <div className="certificate__footer">
              <p className="certificate__date">{date}</p>
            </div>

            <div className="certificate__seal">IELTS</div>
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';

export default Certificate;
