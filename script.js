const qr = document.querySelector('#qr-code');
const target = `${window.location.origin}${window.location.pathname}#menu`;
qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=12&data=${encodeURIComponent(target)}`;
document.querySelector('#qr-url').textContent = target.replace(/^https?:\/\//, '');

document.querySelectorAll('.category-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-tabs button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.menu-card').forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && !card.dataset.category.includes(filter));
    });
  });
});

document.querySelector('#print-qr').addEventListener('click', () => {
  const printWindow = window.open('', '_blank', 'width=620,height=760');
  printWindow.document.write(`<html><head><title>B-deshi Café Menu QR</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:60px;color:#54291d}img{width:340px;height:340px}h1{font-size:32px;margin:0 0 8px}p{color:#806b5d}</style></head><body><h1>B-deshi Café</h1><p>Scan to explore our menu</p><img src="${qr.src}" /><p>${target}</p><script>window.onload=()=>window.print()<\/script></body></html>`);
  printWindow.document.close();
});
