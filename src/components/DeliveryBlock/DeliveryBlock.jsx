import React, { useEffect, useRef, useState } from "react";

export default function DeliveryBlock({ address, setAddress }) {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const [coords, setCoords] = useState([55.751244, 37.618423]); // Москва по умолчанию
  
  // Определяем геопозицию пользователя
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = [pos.coords.latitude, pos.coords.longitude];
          setCoords(userCoords);
          getAddress(userCoords);
          if (ymapsRef.current) {
            ymapsRef.current.setCenter(userCoords);
          }
        },
        () => console.warn("Не удалось определить местоположение")
      );
    }
  }, []);

  useEffect(() => {
    if (window.ymaps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fc9cede5-90c7-48e7-9fbb-3c994fc0e7f9"; // 🔑 свой API-ключ
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(initMap);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || ymapsRef.current) return;

    ymapsRef.current = new window.ymaps.Map(mapRef.current, {
      center: coords,
      zoom: 15,
    });

    // Следим за изменением центра карты
    ymapsRef.current.events.add("boundschange", () => {
      const newCenter = ymapsRef.current.getCenter();
      setCoords(newCenter);
      getAddress(newCenter);
    });

    getAddress(coords);
  };

  // Получение адреса по координатам
  const getAddress = (coords) => {
    if (!window.ymaps) return;
    window.ymaps.geocode(coords).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        setAddress(firstGeoObject.getAddressLine());
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 relative pt-8" id="deliveryBlock">
      <h2 className="text-4xl font-semibold">Укажите адрес доставки</h2>

      {/* Контейнер карты */}
      <div ref={mapRef} className="w-full h-[400px] rounded-2xl shadow-lg"></div>

      {/* Фиксированная метка поверх карты */}
      <div className="absolute top-[220px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="marker"
          className="w-8 h-8"
        />
      </div>

      {/* Информация об адресе */}
      <div className="bg-gray-100 p-3 rounded-lg shadow text-sm w-full">
        <p>
          <span className="font-medium">Адрес:</span> {address}
        </p>
      </div>
    </div>
  );
}
