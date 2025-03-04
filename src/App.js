// Aşağıdaki Stopwatch bileşeni zamanlayıcıyı temsil etmektedir. Ancak şu anda zamanlayıcının temel fonksiyonları eksik durumda.
// Amacınız eksiklikleri gidererek tam fonksiyonel bir zamanlayıcı bileşeni oluşturmaktır.

import { useEffect, useState } from "react";

// ✅ useState ve useEffect kullanarak zamanlayıcının gerçek zamanlı olarak çalışmasını sağlayın.
// ✅ "Başlat" butonuna tıklandığında zamanlayıcının başlamasını ve her saniye artmasını sağlayın.
// ✅ "Durdur" butonuna tıklandığında zamanlayıcının durmasını sağlayın.
// ✅ Zamanlayıcı durdurulduğunda süreyi sıfırlamadan, devam ettirme işlevini ekleyin.

// Bonus:
// ✨ Butonların arka plan rengini tıklamaya bağlı olarak değiştirin:
//    - "Başlat" tıklandığında yeşil, "Durdur" tıklandığında kırmızı olsun.
//    - Aktif buton büyüsün ve küçük bir gölge efekti ekleyin.
// ✨ Zamanlayıcı sayacı çift haneli olacak şekilde formatlayın (örneğin "09s" veya "34s").
// ✨ Sayacın rengi belirli sürelere ulaştığında değişsin:
//    - 10 saniyeden küçükse yeşil, 10-30 saniye arası mavi, 30+ saniyede kırmızı görünsün.
// ✨ Butonlara Tailwind’in `group` özelliğini kullanarak hover efekti ekleyin:
//    - Butona hover yapıldığında sadece kendisi değil, ebeveyn div de farklı bir renge bürünsün.
// ✨ Koyu ve açık tema desteği ekleyin:
//    - Tailwind’in dark mode özelliğini kullanarak sayfanın arayüzünü değiştiren bir tema butonu ekleyin.
// ✨ Sayacın başlangıcında küçük bir animasyon eklensin:
//    - Sayı değiştikçe bir fade-in veya scale-up animasyonu kullanarak geçişleri yumuşatın.

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const getTimerColor = (time) => {
    if (time < 10) return "text-green-500";
    if (time < 30) return "text-blue-500";
    return "text-red-500";
  };

  useEffect(() => {
    let timerID;
    if (isActive) {
      timerID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerID);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };
  const handleStop = () => {
    setIsActive(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // const timerId = setInterval(() => console.log("count"), 1000);
  // clearInterval(timerId);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "dark:bg-gray-800" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="p-12 mx-auto space-y-4 max-w-[300px] group">
        <div
          className={`font-bold text-center text-3xl transform transition-all duration-300 ${getTimerColor(
            time
          )} animate-fade-in`}
        >
          Zamanlayıcı: {formatTime(time)}s
        </div>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleStop}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300
    ${isActive ? "bg-red-500 text-white scale-105 shadow-lg" : "text-red-500"}
    hover:bg-red-100 hover:scale-105`}
          >
            Durdur
          </button>
          <button
            onClick={handleStart}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300
    ${
      !isActive
        ? "bg-green-500 text-white scale-105 shadow-lg"
        : "text-green-500"
    }
    hover:bg-green-100 hover:scale-105`}
          >
            Başlat
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="mt-4 px-4 py-2 rounded-lg font-bold transition-all duration-300
            bg-gray-200 dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {isDark ? "☀️ Açık Tema" : "🌙 Koyu Tema"}
        </button>
      </div>
    </div>
  );
}
