import Leaflet from 'leaflet';
import withActiveItem from '../../hocs/withActiveItem';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      mapIconUrl,
      mapActiveIconUrl,
      mapIconSize,
      mapZoom,
      mapCityCoords
    } = this.props;

    const IconSize = {
      WIDTH: 22,
      HEIGHT: 30
    };

    const MAP_ZOOM = 12;
    const DefaultCityCoords = {
      LATITUDE: 52.3909553943508,
      LONGITUDE: 4.85309666406198
    };

    this.mapContainer = React.createRef();

    this._iconUrl = mapIconUrl
      ? mapIconUrl
      : `/img/pin.svg`;
    this._activeIconUrl = mapActiveIconUrl
      ? mapActiveIconUrl
      : `/img/pin-active.svg`;
    this._iconSize = mapIconSize
      ? mapIconSize
      : [IconSize.WIDTH, IconSize.HEIGHT];
    this._zoom = mapZoom
      ? mapZoom
      : MAP_ZOOM;
    this._city = mapCityCoords
      ? mapCityCoords
      : [DefaultCityCoords.LATITUDE, DefaultCityCoords.LONGITUDE];

    this._icon = Leaflet.icon({iconUrl: this._iconUrl, iconSize: this._iconSize});
    this._iconActive = Leaflet.icon({iconUrl: this._activeIconUrl, iconSize: this._iconSize});

    this.state = {
      cards: this.props.cards,
    };
  }

  _addMarkersToMap() {
    this._markerGroup = Leaflet
      .layerGroup()
      .addTo(this._map);

    this
      .state
      .cards
      .forEach((card) => {
        if (this.props.activeItem && (card.id === this.props.activeItem.id)) {
          Leaflet
            .marker(card.coordinates, {icon: this._iconActive})
            .addTo(this._markerGroup);
        } else {
          Leaflet
            .marker(card.coordinates, {icon: this._icon})
            .addTo(this._markerGroup);
        }

      });
  }

  componentDidMount() {
    this._map = this.mapContainer.current
      ? Leaflet.map(this.mapContainer.current, {
        center: this._city,
        zoom: this._zoom,
        zoomControl: false,
        marker: true
      })
      : null;

    if (this._map) {
      this
        ._map
        .setView(this._city, this._zoom);

      Leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contr` + `ibutors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this._map);

      this._addMarkersToMap();
    }
  }

  componentDidUpdate() {
    this.props.onSelectActiveElement(this.props.hoveredCard);
    this.setState({cards: this.props.cards});

    this
      ._map
      .removeLayer(this._markerGroup);

    this._addMarkersToMap();
  }

  render() {
    return (
      <div
        id="map"
        style={{
          width: `100%`,
          height: `100%`
        }}
        ref={this.mapContainer}></div>
    );
  }
}

export default withActiveItem(Map);

Map.propTypes = {
  mapIconUrl: PropTypes.string,
  mapActiveIconUrl: PropTypes.string,
  mapIconSize: PropTypes.arrayOf(PropTypes.number.isRequired),
  mapZoom: PropTypes.number,
  mapCityCoords: PropTypes.arrayOf(PropTypes.number.isRequired),
  hoveredCard: PropTypes.object,
  activeItem: PropTypes.object,
  onSelectActiveElement: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    mark: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
  }))
};
