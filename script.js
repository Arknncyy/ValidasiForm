document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-pendaftaran");

  const fields = [
    { id: "nama-lengkap", errorId: "error-nama-lengkap", name: "Nama Lengkap" },
    { id: "alamat-surat", errorId: "error-alamat-surat", name: "Alamat Surat" },
    { id: "alamat-asal", errorId: "error-alamat-asal", name: "Alamat Asal" },
    { id: "kabupaten", errorId: "error-kabupaten", name: "Kabupaten/Kota" },
    { id: "propinsi", errorId: "error-propinsi", name: "Propinsi" },
    { id: "hp", errorId: "error-hp", name: "No. HP" },
    { id: "email", errorId: "error-email", name: "Alamat E-mail" },
    { id: "nama-ortu", errorId: "error-nama-ortu", name: "Nama Orang Tua/Wali" },
    { id: "pendidikan-ortu", errorId: "error-pendidikan-ortu", name: "Pendidikan Orang Tua" },
    { id: "pilihan-1", errorId: "error-pilihan-1", name: "Pilihan I Program Studi" },
    { id: "nama-sekolah", errorId: "error-nama-sekolah", name: "Nama Sekolah" },
    { id: "jurusan-sekolah", errorId: "error-jurusan-sekolah", name: "Jurusan Sekolah" },
    { id: "pernyataan", errorId: "error-pernyataan", name: "Pernyataan Keabsahan Data" }
  ];

  function validasiField(input, errorElement, fieldName) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(`${fieldName} wajib diisi.`);
    } else if (input.validity.tooShort) {
      input.setCustomValidity(`${fieldName} minimal ${input.minLength} karakter.`);
    } else if (input.validity.typeMismatch && input.type === "email") {
      input.setCustomValidity("Format e-mail tidak valid (contoh: nama@domain.com).");
    } else if (input.validity.patternMismatch && input.id === "hp") {
      input.setCustomValidity("Nomor HP harus diawali '08' dan berjumlah 10-13 digit angka.");
    }

    if (!input.checkValidity()) {
      errorElement.textContent = input.validationMessage;
    } else {
      errorElement.textContent = "";
    }
  }

  fields.forEach(field => {
    const inputEl = document.querySelector(`#${field.id}`);
    const errorEl = document.querySelector(`#${field.errorId}`);

    if (inputEl && errorEl) {
      inputEl.addEventListener("input", () => validasiField(inputEl, errorEl, field.name));
      inputEl.addEventListener("change", () => validasiField(inputEl, errorEl, field.name));
    }
  });

  function validasiRadioGroup(groupName, errorId, labelName) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    const errorEl = document.querySelector(`#${errorId}`);
    const isChecked = Array.from(radios).some(r => r.checked);

    if (!isChecked) {
      errorEl.textContent = `${labelName} wajib dipilih.`;
      return false;
    } else {
      errorEl.textContent = "";
      return true;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let formValid = true;

    fields.forEach(field => {
      const inputEl = document.querySelector(`#${field.id}`);
      const errorEl = document.querySelector(`#${field.errorId}`);
      if (inputEl && errorEl) {
        validasiField(inputEl, errorEl, field.name);
        if (!inputEl.checkValidity()) {
          formValid = false;
        }
      }
    });

    const r1 = validasiRadioGroup("jenis_kelamin", "error-jenis-kelamin", "Jenis Kelamin");
    const r2 = validasiRadioGroup("status", "error-status", "Status");
    const r3 = validasiRadioGroup("agama", "error-agama", "Agama");
    const r4 = validasiRadioGroup("kewarganegaraan", "error-kewarganegaraan", "Kewarganegaraan");

    if (!r1 || !r2 || !r3 || !r4) {
      formValid = false;
    }

    if (formValid) {
      alert("Pendaftaran berhasil dikirim!");
      form.reset();
      document.querySelectorAll(".pesan-error").forEach(span => span.textContent = "");
    } else {
      const inputBermasalah = form.querySelector(":invalid");
      if (inputBermasalah) inputBermasalah.focus();
    }
  });
});