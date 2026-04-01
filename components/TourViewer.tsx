import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

// ─── Reemplaza con la URL real de tu tour en Lapentor ───────────────────────
const LAPENTOR_URL = 'https://app.lapentor.com/sphere/recorrido-360-uets';

// ─── Versión WEB: usa iframe ────────────────────────────────────────────────
function TourWeb() {
  return (
    <View style={styles.container}>
      {/* @ts-ignore — iframe solo existe en web */}
      <iframe
        src={LAPENTOR_URL}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
        allow="vr; xr; accelerometer; gyroscope"
        title="Tour 360"
      />
    </View>
  );
}

// ─── Versión MÓVIL: inyecta HTML con iframe para forzar carga ───────────────
//
//  Por qué esto funciona en Expo Go:
//  En lugar de navegar directo a la URL (que puede fallar si Lapentor
//  bloquea WebView), cargamos un HTML local que contiene el iframe.
//  Así el WebView renderiza contenido local primero y el tour carga dentro.
//
const buildHTML = (url: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 100%; height: 100%; background: #0A0E1A; overflow: hidden; }
      iframe { width: 100%; height: 100%; border: none; display: block; }
    </style>
  </head>
  <body>
    <iframe
      src="${url}"
      allowfullscreen="true"
      allow="vr; xr; accelerometer; gyroscope; fullscreen"
      scrolling="no"
    ></iframe>
  </body>
</html>
`;

function TourMobile() {
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>No se pudo cargar el tour</Text>
        <Text style={styles.errorText}>
          Verifica tu conexión a internet y que la URL de Lapentor sea correcta.
        </Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => setError(false)}
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4A7CFF" />
          <Text style={styles.loadingText}>Cargando tour 360°...</Text>
        </View>
      )}

      <WebView
        source={{ html: buildHTML(LAPENTOR_URL) }}
        style={[styles.webview, loading && styles.hidden]}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        mixedContentMode="always"
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        onHttpError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </View>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function TourViewer() {
  return Platform.OS === 'web' ? <TourWeb /> : <TourMobile />;
}

// ─── Estilos ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  hidden: {
    opacity: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0E1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 10,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryBtn: {
    marginTop: 12,
    backgroundColor: '#4A7CFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});