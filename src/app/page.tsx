'use client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cards from 'react-credit-cards-2';
// import 'react-credit-cards-2/es/styles-compiled.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        {[...Array(10)].map((_, index) => (
          <EventCard
            key={index}
            index={index}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>

      {/* 「募集する」ボタン */}
      <button
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '50%',
          width: '120px', // 幅を半分に
          height: '120px', // 高さを半分に
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px', // 文字サイズを倍に
          textAlign: 'center',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        募集する
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreditCardForm />
      </Modal>
    </main>
  );
}
function EventCard({
  index,
  setIsModalOpen,
}: {
  index: number;
  setIsModalOpen: Function;
}) {
  return (
    <div className="w-full p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-blue-600">
        イベント#{index + 1}
      </h3>
      <p className="text-sm text-gray-600" onClick={() => setIsModalOpen(true)}>
        日時場所: 例
      </p>
      <p className="text-sm text-gray-600">金額: 例</p>
      <p className="text-sm text-gray-600">その他: 例</p>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>,
    document.body
  );
};

const CreditCardForm = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div>
      <Cards number={number} name={name} expiry={expiry} cvc={cvc} />
      <form>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={e => setNumber(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Expiry"
          onChange={e => setExpiry(e.target.value)}
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={e => setCvc(e.target.value)}
        />
      </form>
    </div>
  );
};
