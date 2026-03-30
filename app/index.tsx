import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  // Animaciones de entrada
  const fadeTitle   = useRef(new Animated.Value(0)).current;
  const slideText   = useRef(new Animated.Value(40)).current;
  const fadeText    = useRef(new Animated.Value(0)).current;
  const scaleBtn    = useRef(new Animated.Value(0.85)).current;
  const fadeBtn     = useRef(new Animated.Value(0)).current;
  const pulseAnim   = useRef(new Animated.Value(1)).current;
  const rotateAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia de entrada escalonada
    Animated.sequence([
      Animated.timing(fadeTitle, {
        toValue: 1, duration: 900, useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeText, {
          toValue: 1, duration: 700, useNativeDriver: true,
        }),
        Animated.timing(slideText, {
          toValue: 0, duration: 700, useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeBtn, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
        Animated.spring(scaleBtn, {
          toValue: 1, friction: 6, tension: 80, useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Pulso continuo del botón
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06, duration: 1200, useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, duration: 1200, useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotación suave del ícono 360
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1, duration: 8000, useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePress = () => {
    router.push('/tour');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Fondo con gradiente simulado en capas */}
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />
      <View style={styles.bgLayer3} />

      {/* Círculos decorativos de fondo */}
      <View style={[styles.circle, styles.circleTopRight]} />
      <View style={[styles.circle, styles.circleBottomLeft]} />
      <View style={[styles.circle, styles.circleMid]} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── SECCIÓN SUPERIOR: TÍTULO ── */}
        <View style={styles.topSection}>
          {/* Badge superior */}
          <Animated.View style={[styles.badge, { opacity: fadeTitle }]}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Tour Virtual Interactivo</Text>
          </Animated.View>

          {/* Título principal */}
          <Animated.Text style={[styles.title, { opacity: fadeTitle }]}>
            Explora Cada{'\n'}
            <Text style={styles.titleAccent}>Rincón</Text>
          </Animated.Text>

          {/* Ícono 360 animado */}
          <Animated.View style={[styles.icon360Wrapper, { opacity: fadeTitle }]}>
            <Animated.View style={[styles.icon360Ring, { transform: [{ rotate }] }]} />
            <Text style={styles.icon360Text}>360°</Text>
          </Animated.View>
        </View>

        {/* ── SECCIÓN CENTRAL: DESCRIPCIÓN ── */}
        <Animated.View
          style={[
            styles.descCard,
            {
              opacity: fadeText,
              transform: [{ translateY: slideText }],
            },
          ]}
        >
          {/* Línea decorativa */}
          <View style={styles.cardAccentLine} />

          <Text style={styles.descTitle}>Sobre el Recorrido</Text>

          <Text style={styles.descText}>
            Bienvenido a nuestra experiencia inmersiva en 360°. A través de este
            recorrido virtual podrás explorar cada espacio con total libertad,
            observando los detalles desde cualquier ángulo como si estuvieras
            presente físicamente.
          </Text>

          <Text style={styles.descText}>
            Navega entre las diferentes áreas, acércate a los puntos de interés
            y descubre toda la información disponible en cada zona del recorrido.
            Una experiencia única diseñada para ti.
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>360°</Text>
              <Text style={styles.statLabel}>Vista completa</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>HD</Text>
              <Text style={styles.statLabel}>Alta definición</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Exploración libre</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── SECCIÓN INFERIOR: BOTÓN ── */}
        <Animated.View
          style={[
            styles.btnWrapper,
            {
              opacity: fadeBtn,
              transform: [{ scale: scaleBtn }],
            },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handlePress}
              activeOpacity={0.85}
            >
              {/* Brillo interno del botón */}
              <View style={styles.btnShine} />

              {/* Ícono dentro del botón */}
              <View style={styles.btnIconCircle}>
                <Text style={styles.btnIconText}>▶</Text>
              </View>

              <Text style={styles.btnLabel}>Recorrido 360°</Text>

              {/* Flecha */}
              <Text style={styles.btnArrow}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.btnHint}>Toca para iniciar la experiencia</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },

  // ── Capas de fondo ──
  bgLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0E1A',
  },
  bgLayer2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderRadius: 0,
    top: 0,
    bottom: height * 0.4,
    backgroundColor: '#0D1528',
  },
  bgLayer3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    backgroundColor: '#070B14',
  },

  // ── Círculos decorativos ──
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.08,
  },
  circleTopRight: {
    width: 320,
    height: 320,
    backgroundColor: '#4A7CFF',
    top: -100,
    right: -80,
  },
  circleBottomLeft: {
    width: 260,
    height: 260,
    backgroundColor: '#00C9A7',
    bottom: 100,
    left: -100,
  },
  circleMid: {
    width: 180,
    height: 180,
    backgroundColor: '#4A7CFF',
    top: height * 0.38,
    right: -40,
    opacity: 0.05,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  // ── Sección superior ──
  topSection: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 124, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(74, 124, 255, 0.35)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 24,
    gap: 7,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4A7CFF',
  },
  badgeText: {
    color: '#8AABFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 54,
    letterSpacing: -1,
    marginBottom: 28,
  },
  titleAccent: {
    color: '#4A7CFF',
  },

  // Ícono 360 animado
  icon360Wrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon360Ring: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(74, 124, 255, 0.5)',
    borderStyle: 'dashed',
  },
  icon360Text: {
    color: '#4A7CFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // ── Tarjeta de descripción ──
  descCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 26,
    marginBottom: 32,
  },
  cardAccentLine: {
    width: 40,
    height: 3,
    backgroundColor: '#00C9A7',
    borderRadius: 2,
    marginBottom: 16,
  },
  descTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  descText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    color: '#4A7CFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // ── Botón ──
  btnWrapper: {
    alignItems: 'center',
    marginTop: 8,
    gap: 14,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A7CFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: width - 48,
    gap: 14,
    overflow: 'hidden',
    shadowColor: '#4A7CFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 12,
  },
  btnShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 2,
  },
  btnLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnArrow: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 20,
    fontWeight: '300',
  },
  btnHint: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});