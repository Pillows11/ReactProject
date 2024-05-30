import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './header';
import './style.css'; // Impor file CSS
import { getData } from './data';

// Komponen CardImage
function CardImage({ foto }) {
    return (
        <div className="card-image">
            <img src={foto} alt="Student" />
        </div>
    );
}

// Komponen CardBody
function CardBody({ nama, kelas, alamat }) {
    return (
        <div className="card-body">
            <h2>{nama}</h2>
            <p>Kelas: {kelas}</p>
            <p>Alamat: {alamat}</p>
        </div>
    );
}

// Komponen Card
function Card({ nama, kelas, alamat, foto, onDelete }) {
    return (    
        <div className="card">
            <CardImage foto={foto} />
            <CardBody nama={nama} kelas={kelas} alamat={alamat} />
            <button className="delete-button" onClick={() => onDelete(nama)}>Delete</button>
        </div>
    );
}

function Biodata(){
    const [dataSiswa, setDataSiswa] = useState(getData());
    const [deletedSiswa, setDeletedSiswa] = useState([]);

    const handleDelete = (nama) => {
        const siswa = dataSiswa.find(siswa => siswa.nama === nama);
        setDeletedSiswa([siswa, ...deletedSiswa]);
        setDataSiswa(dataSiswa.filter(siswa => siswa.nama !== nama));
    };

    const handleUndo = () => {
        if (deletedSiswa.length > 0) {
            const lastDeleted = deletedSiswa[0];
            setDeletedSiswa(deletedSiswa.slice(1));
            setDataSiswa([lastDeleted, ...dataSiswa]);
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                {dataSiswa.map((siswa) => (
                    <Card {...siswa} key={siswa.nama} onDelete={handleDelete} />
                ))}
            </div>
            {deletedSiswa.length > 0 && (
                <div className="undo-container">
                    <button className="undo-button" onClick={handleUndo}>Undo</button>
                </div>
            )}
        </div>
    );      
}

const root = createRoot(document.getElementById('root'));
root.render(<Biodata />);
