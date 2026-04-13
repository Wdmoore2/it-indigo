function initMap() {

    const location = { lat: 36.0260, lng: -93.3652 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,

    
        mapId: "1f3f85a0a84832a6e03de024"
    });

    const markerContent = document.createElement("div");

    markerContent.innerHTML = `
        <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
        ">
            <img src="https://maps.google.com/mapfiles/ms/icons/green-dot.png">
            <div style="
                background:white;
                padding:4px 10px;
                border-radius:12px;
                margin-top:4px;
                font-weight:bold;
                color:#2e7d32;
                box-shadow:0 2px 6px rgba(0,0,0,0.3);
                white-space:nowrap;
            ">
                Nature's Elk Outfitters
            </div>
        </div>
    `;

    new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location,
        content: markerContent
    });
}