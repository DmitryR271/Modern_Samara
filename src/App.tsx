import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  Layers,
  Lightbulb,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Sunrise,
  Tag,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react';

/* ───────────── DATA ───────────── */

const products = [
  { icon: Layers, label: 'Матовые', description: 'Спокойная ровная поверхность без бликов — универсальный выбор для спальни и гостиной.', features: ['Мягко рассеивают свет', 'Скрывают неровности основания', 'Подходят для любого интерьера'], img: 'https://images.pexels.com/photos/6980724/pexels-photo-6980724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Sparkles, label: 'Глянцевые', description: 'Отражающая поверхность визуально добавляет высоту и света компактным помещениям.', features: ['Визуально увеличивают пространство', 'Легко очищаются', 'Эффектный акцент для кухни'], img: 'https://images.pexels.com/photos/6970049/pexels-photo-6970049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Sunrise, label: 'Сатиновые', description: 'Деликатный шёлковый блеск для интерьеров, где важны тепло и аккуратная фактура.', features: ['Благородный рассеянный блеск', 'Не перегружают интерьер', 'Красиво работают с подсветкой'], img: 'https://images.pexels.com/photos/7166945/pexels-photo-7166945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Lightbulb, label: 'С подсветкой', description: 'Световые линии и контуры создают сценарий освещения без лишних светильников.', features: ['Ровный свет без теней', 'Можно разделить зоны', 'Управление яркостью'], img: 'https://images.pexels.com/photos/8082242/pexels-photo-8082242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Zap, label: 'Парящие', description: 'Тонкая световая линия по периметру создаёт ощущение, что потолок отделён от стен.', features: ['Современный архитектурный эффект', 'Скрытая LED-подсветка', 'Подходит для минимализма'], img: 'https://images.pexels.com/photos/813691/pexels-photo-813691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Layers, label: 'Многоуровневые', description: 'Комбинация уровней помогает выделить зоны и собрать сложную геометрию интерьера.', features: ['Зонирование помещения', 'Комбинация фактур', 'Для больших площадей'], img: 'https://images.pexels.com/photos/7546230/pexels-photo-7546230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Star, label: 'Звёздное небо', description: 'Оптоволоконные точки света превращают потолок в выразительную деталь комнаты.', features: ['Сотни световых точек', 'Индивидуальный рисунок', 'Эффектный вечерний сценарий'], img: 'https://images.pexels.com/photos/20705878/pexels-photo-20705878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: Tag, label: 'Теневой профиль', description: 'Чёткий графичный зазор между стеной и потолком без видимого потолочного плинтуса.', features: ['Чистая геометрия', 'Скрывает примыкание', 'Премиальный вид без декора'], img: 'https://images.pexels.com/photos/6934239/pexels-photo-6934239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

const whyCards = [
  { num: '01', icon: Tag, title: 'Фиксированная цена', text: 'Стоимость закрепляем в договоре в день замера. Без доплат после.' },
  { num: '02', icon: Calendar, title: 'Дата монтажа в договоре', text: 'Сроки не сдвигаются. Вы спокойно планируете ремонт.' },
  { num: '03', icon: ShieldCheck, title: 'Гарантия до 10 лет', text: 'До 10 лет на полотно и 1 год на монтажные работы. Официально, письменно.' },
  { num: '04', icon: Star, title: 'Опыт и репутация', text: 'Десятки довольных клиентов в Самаре. Аккуратно, чисто, в срок.' },
];

const advItems = [
  { icon: Ruler, title: 'Замер бесплатно', text: 'Выезжаем по Самаре в день обращения' },
  { icon: ShieldCheck, title: 'Договор', text: 'Все условия фиксируем письменно' },
  { icon: CheckCircle2, title: 'Приёмка', text: 'Фото и видео результата у вас на руках' },
  { icon: Sparkles, title: 'Уборка', text: 'Оставляем объект чистым после монтажа' },
  { icon: Calendar, title: 'Точно в срок', text: 'Монтаж в согласованный день, без переносов' },
];

const processSteps = [
  { num: '1', title: 'Заявка', text: 'Проходите квиз — узнаёте предварительную стоимость.' },
  { num: '2', title: 'Замер', text: 'Бесплатно выезжаем, снимаем размеры, уточняем детали.' },
  { num: '3', title: 'Смета', text: 'Готовим смету, фиксируем цену. Без доплат позже.' },
  { num: '4', title: 'Договор', text: 'Заключаем договор с фиксированными сроками.' },
  { num: '5', title: 'Монтаж', text: 'Устанавливаем силами своих специалистов.' },
  { num: '6', title: 'Сдача', text: 'Приёмка работ, документы, гарантия до 10 лет.' },
];

const workFilters = ['Все работы', 'Гостиная', 'Кухня', 'Ванная', 'Коммерческие'];
type Work = { title: string; tag: string; img: string; ceiling: string; area: string; detail: string };
const works: Work[] = [
  { title: 'Матовый потолок, 2-комнатная', tag: 'Гостиная', ceiling: 'Матовый', area: '68 м²', detail: 'Ровное полотно без бликов, аккуратные примыкания и подготовка точек под светильники.', img: 'https://images.pexels.com/photos/6980724/pexels-photo-6980724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Потолок с подсветкой, кухня', tag: 'Кухня', ceiling: 'С подсветкой', area: '18 м²', detail: 'Световая линия над рабочей зоной и отдельный сценарий над обеденным столом.', img: 'https://images.pexels.com/photos/8082197/pexels-photo-8082197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Парящий потолок, гостиная', tag: 'Гостиная', ceiling: 'Парящий', area: '32 м²', detail: 'Скрытая LED-лента по периметру и теневой зазор без видимого плинтуса.', img: 'https://images.pexels.com/photos/813691/pexels-photo-813691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Теневой профиль, ванная', tag: 'Ванная', ceiling: 'Теневой профиль', area: '9 м²', detail: 'Влагостойкое полотно, точные вырезы под вентиляцию и встроенные светильники.', img: 'https://images.pexels.com/photos/8469950/pexels-photo-8469950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Многоуровневый, офис', tag: 'Коммерческие', ceiling: 'Многоуровневый', area: '94 м²', detail: 'Зонирование open space разными уровнями и равномерной рабочей подсветкой.', img: 'https://images.pexels.com/photos/6934239/pexels-photo-6934239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Сатиновый потолок, студия', tag: 'Гостиная', ceiling: 'Сатиновый', area: '27 м²', detail: 'Светлая сатиновая фактура визуально расширяет студию и мягко отражает дневной свет.', img: 'https://images.pexels.com/photos/7166945/pexels-photo-7166945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Глянцевый потолок, кухня', tag: 'Кухня', ceiling: 'Глянцевый', area: '16 м²', detail: 'Глянцевая поверхность усилила естественный свет и добавила объёма компактной кухне.', img: 'https://images.pexels.com/photos/6970049/pexels-photo-6970049.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Звёздное небо, спальня', tag: 'Гостиная', ceiling: 'Звёздное небо', area: '21 м²', detail: 'Индивидуальный рисунок оптоволоконных точек с мягким вечерним сценарием.', img: 'https://images.pexels.com/photos/20705878/pexels-photo-20705878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Парящий потолок, шоурум', tag: 'Коммерческие', ceiling: 'Парящий', area: '76 м²', detail: 'Графичная световая линия подчеркнула витрины и фирменную геометрию пространства.', img: 'https://images.pexels.com/photos/7546230/pexels-photo-7546230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Матовый потолок, спальня', tag: 'Гостиная', ceiling: 'Матовый', area: '20 м²', detail: 'Нейтральная матовая фактура и скрытые карнизы для спокойного интерьера.', img: 'https://images.pexels.com/photos/7587828/pexels-photo-7587828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Сатиновый потолок, кухня', tag: 'Кухня', ceiling: 'Сатиновый', area: '24 м²', detail: 'Сатиновое полотно в тон фасадам и точечный свет над рабочей поверхностью.', img: 'https://images.pexels.com/photos/6238684/pexels-photo-6238684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { title: 'Теневой профиль, офис', tag: 'Коммерческие', ceiling: 'Теневой профиль', area: '51 м²', detail: 'Чистый периметр и быстрый монтаж без остановки работы офиса.', img: 'https://images.pexels.com/photos/6934239/pexels-photo-6934239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

const reviews = [
  { name: 'Елена С.', role: 'квартира в Самаре', text: 'Заказывали натяжной потолок в гостиную. Замерщик приехал на следующий день, смету зафиксировали сразу. Монтаж сделали аккуратно, всё убрали за собой. Цена не изменилась.', stars: 5 },
  { name: 'Дмитрий К.', role: 'коттедж, Самара', text: 'Делали парящий потолок с подсветкой. Результат превзошёл ожидания — свет равномерный, швов не видно. Договор и гарантия оформлены официально.', stars: 5 },
  { name: 'Ольга М.', role: 'студия, Самара', text: 'Понравилось, что сразу назвали точную сумму. Монтаж прошёл за полдня, после себя оставили чистоту. Ребята молодцы, вежливые и аккуратные.', stars: 5 },
  { name: 'Руслан А.', role: 'ремонт квартиры', text: 'Команда действительно работает по процессу. Замер, договор, монтаж — всё по плану. Установили уже себе и родителям, ребята молодцы!', stars: 5 },
  { name: 'Марина Т.', role: 'кухня и коридор', text: 'Подсветку продумали на замере, показали несколько вариантов. Получилось аккуратно и намного светлее, чем с одним центральным светильником.', stars: 5 },
  { name: 'Евгений П.', role: 'офис на Московском шоссе', text: 'Важна была дата монтажа — открывали офис. Закрепили сроки в договоре и закончили без задержек. Документы получили в тот же день.', stars: 5 },
  { name: 'Алина Н.', role: 'двухкомнатная квартира', text: 'Очень спокойный сервис: без давления, понятная смета и нормальные ответы на все вопросы. Потолок выглядит дороже своей стоимости.', stars: 5 },
  { name: 'Тимур Р.', role: 'частный дом', text: 'Выбрали сатиновое полотно и теневой профиль. Бригада приехала вовремя, закрыли мебель и после монтажа всё убрали. Рекомендую!', stars: 5 },
  { name: 'Жанна К.', role: 'спальня, Самара', text: 'Спасибо за аккуратность. Особенно понравилось, что заранее согласовали каждую точку света и не пришлось ничего переделывать.', stars: 5 },
];

const faqs = [
  { q: 'Вы работаете в Самаре или по всей области?', a: 'Мы работаем по Самаре и Самарской области. Выезжаем на замер в день обращения или в удобный для вас день. Звоните — подскажем по вашему району.' },
  { q: 'Может ли измениться цена после замера?', a: 'Нет. После замера мы готовим подробную смету. Стоимость фиксируется в договоре до начала работ и не меняется на монтаже.' },
  { q: 'Как формируются сроки?', a: 'Дата монтажа согласуется с вашим графиком и фиксируется в договоре на замере. Точные сроки называем до подписания договора.' },
  { q: 'Какая гарантия?', a: 'Гарантия на материалы — до 10 лет, на монтажные работы — 1 год. Условия фиксируются в договоре письменно.' },
  { q: 'Что входит в стоимость?', a: 'В смете отдельно и понятно указываем полотно, профиль, монтаж, уборку и приёмку. Никаких скрытых позиций.' },
  { q: 'Работаете ли вы по договору?', a: 'Да. В договоре закрепляем состав работ, стоимость, дату монтажа и гарантию.' },
];

const heroProof = [
  { num: '10', v: 'лет', l: 'гарантия' },
  { num: 'бесплатно', v: 'замер', l: 'по Самаре' },
  { num: 'от 390', v: '₽/м²', l: 'матовые' },
  { num: '1 день', v: 'монтаж', l: 'в договоре' },
];

/* ───────────── QUIZ DATA ───────────── */

type QuizOption = { label: string; icon: typeof Home; value: string };
type QuizStep = { key: string; question: string; subtitle?: string; options: QuizOption[] };

const quizSteps: QuizStep[] = [
  {
    key: 'room_type',
    question: 'Где будет потолок?',
    subtitle: 'Это влияет на выбор полотна и сложность монтажа',
    options: [
      { label: 'Квартира', icon: Home, value: 'Квартира' },
      { label: 'Дом / коттедж', icon: Building2, value: 'Дом' },
      { label: 'Офис / коммерческое', icon: Store, value: 'Коммерческое' },
      { label: 'Другое', icon: Tag, value: 'Другое' },
    ],
  },
  {
    key: 'ceiling_type',
    question: 'Какой тип потолка интересует?',
    subtitle: 'Можно выбрать несколько, но отметьте основной',
    options: [
      { label: 'Матовый', icon: Layers, value: 'Матовый' },
      { label: 'Глянцевый', icon: Sparkles, value: 'Глянцевый' },
      { label: 'Сатиновый', icon: Sunrise, value: 'Сатиновый' },
      { label: 'С подсветкой', icon: Lightbulb, value: 'С подсветкой' },
      { label: 'Парящий', icon: Zap, value: 'Парящий' },
      { label: 'Звёздное небо', icon: Star, value: 'Звёздное небо' },
    ],
  },
  {
    key: 'area',
    question: 'Какая площадь помещения?',
    subtitle: 'Для предварительного расчёта',
    options: [
      { label: 'До 15 м²', icon: Ruler, value: 'До 15 м²' },
      { label: '15–30 м²', icon: Ruler, value: '15–30 м²' },
      { label: '30–50 м²', icon: Ruler, value: '30–50 м²' },
      { label: 'Больше 50 м²', icon: Ruler, value: 'Больше 50 м²' },
    ],
  },
  {
    key: 'urgency',
    question: 'Когда планируете монтаж?',
    subtitle: 'Поможем подстроиться под ваш график',
    options: [
      { label: 'Как можно скорее', icon: Zap, value: 'Срочно' },
      { label: 'В течение 2 недель', icon: Clock, value: '2 недели' },
      { label: 'В течение месяца', icon: Calendar, value: 'Месяц' },
      { label: 'Просто узнаю цену', icon: Tag, value: 'Узнаю цену' },
    ],
  },
];

const basePrices: Record<string, number> = {
  'Матовый': 400,
  'Глянцевый': 550,
  'Сатиновый': 500,
  'С подсветкой': 900,
  'Парящий': 1100,
  'Звёздное небо': 1500,
};

const areaMid: Record<string, number> = {
  'До 15 м²': 12,
  '15–30 м²': 22,
  '30–50 м²': 40,
  'Больше 50 м²': 60,
};

const roomMultiplier: Record<string, number> = {
  'Квартира': 1,
  'Дом': 1.15,
  'Коммерческое': 0.9,
};

function formatRub(n: number): string {
  return n.toLocaleString('ru-RU') + ' ₽';
}

function calcEstimate(answers: Record<string, string>): { low: number; high: number; perM2: number } {
  const ceiling = answers.ceiling_type || 'Матовый';
  const area = answers.area || '15–30 м²';
  const room = answers.room_type || 'Квартира';
  const perM2 = basePrices[ceiling] || 400;
  const sqm = areaMid[area] || 22;
  const mult = roomMultiplier[room] || 1;
  const total = perM2 * sqm * mult;
  return { low: Math.round(total * 0.9), high: Math.round(total * 1.15), perM2 };
}

/* ───────────── HOOK ───────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ───────────── VK ICON ───────────── */

function VkIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.785 16.241s.281.031.434-.181l.217-.288c.143-.193.447-.16.749-.057.354.121.52.305.642.5l.36.506c.115.164.252.193.412.193l1.494-.006c.146 0 .254-.057.293-.158.04-.1-.014-.367-.293-.701-.36-.43-.894-.95-1.527-1.52-.22-.198-.43-.395-.595-.566-.146-.15-.221-.293-.117-.47.27-.502.81-1.406 1.004-1.766.119-.21.088-.387-.088-.49-.176-.1-.51-.1-.51-.1h-1.728s-.146-.014-.252.05c-.1.061-.176.205-.176.205s-.32.857-.748 1.44c-.902 1.234-1.27 1.299-1.416 1.223-.354-.225-.27-1.078-.27-1.654 0-1.143.176-1.617-.34-1.738-.17-.037-.297-.064-.734-.068-.56-.006-1.034.002-1.302.131-.176.088-.31.275-.23.287.117.016.383.061.525.219.176.193.17.629.17.629s.1 1.193-.234 1.34c-.23.123-.545-.131-1.334-1.283-.41-.582-.715-1.223-.715-1.223s-.064-.146-.176-.221c-.111-.073-.27-.073-.27-.073l-1.644.01s-.246.008-.336.15c-.082.13-.006.4.006.42 0 0 .97 2.275 2.072 3.42 1.01 1.05 2.155 1.077 2.155 1.077h.53z"/>
    </svg>
  );
}

/* ───────────── QUIZ MODAL ───────────── */

type QuizAnswers = Record<string, string>;

function QuizModal({ onClose }: { onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showResult, setShowResult] = useState(false);

  const isContactStep = stepIdx === quizSteps.length;
  const totalSteps = quizSteps.length + 1;

  const progress = Math.min(((stepIdx) / totalSteps) * 100, 100);
  const estimate = calcEstimate(answers);

  const selectOption = (stepKey: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepKey]: value }));
    setTimeout(() => setStepIdx((prev) => prev + 1), 280);
  };

  const goBack = () => {
    if (stepIdx > 0) setStepIdx((prev) => prev - 1);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    setStepIdx(quizSteps.length + 1);
  };

  const canSubmit = phone.trim().length >= 6;

  return (
    <div className="quiz-backdrop" onMouseDown={onClose}>
      <div className="quiz-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="quiz-close" aria-label="Закрыть" onClick={onClose}><X size={22} /></button>

        {!showResult && (
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        {!showResult && !isContactStep && (
          <div className="quiz-step-indicator">Вопрос {stepIdx + 1} из {quizSteps.length}</div>
        )}

        {/* QUESTION STEPS */}
        {!showResult && !isContactStep && quizSteps[stepIdx] && (
          <div className="quiz-step-content">
            <h3 className="quiz-question">{quizSteps[stepIdx].question}</h3>
            {quizSteps[stepIdx].subtitle && <p className="quiz-subtitle">{quizSteps[stepIdx].subtitle}</p>}
            <div className="quiz-options">
              {quizSteps[stepIdx].options.map((opt) => {
                const isSelected = answers[quizSteps[stepIdx].key] === opt.value;
                return (
                  <button
                    className={isSelected ? 'quiz-option selected' : 'quiz-option'}
                    key={opt.value}
                    onClick={() => selectOption(quizSteps[stepIdx].key, opt.value)}
                  >
                    <span className="quiz-option-ic"><opt.icon size={22} /></span>
                    <span className="quiz-option-label">{opt.label}</span>
                    <span className="quiz-option-check">{isSelected && <CheckCircle2 size={20} />}</span>
                  </button>
                );
              })}
            </div>
            {stepIdx > 0 && (
              <button className="quiz-back" onClick={goBack}><ArrowLeft size={16} /> Назад</button>
            )}
          </div>
        )}

        {/* CONTACT STEP */}
        {!showResult && isContactStep && (
          <div className="quiz-step-content">
            <h3 className="quiz-question">Куда отправить расчёт?</h3>
            <p className="quiz-subtitle">Укажите телефон — пришлём точную смету и подберём дату замера. Без навязчивых звонков.</p>
            <form className="quiz-contact-form" onSubmit={submitContact}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="+7 ___ ___ __ __"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!canSubmit}>
                Получить расчёт <ArrowRight size={18} />
              </button>
            </form>
            <button className="quiz-back" onClick={goBack}><ArrowLeft size={16} /> Назад</button>
            <div className="quiz-disclaimer">Расчёт бесплатный и ни к чему не обязывает</div>
          </div>
        )}

        {/* RESULT STEP */}
        {showResult && (
          <div className="quiz-result">
            <div className="quiz-result-icon"><CheckCircle2 size={40} /></div>
            <h3 className="quiz-result-title">Ваш предварительный расчёт</h3>
            <div className="quiz-result-price">
              <span className="quiz-price-from">от</span>
              <span className="quiz-price-value">{formatRub(estimate.low)}</span>
              <span className="quiz-price-to">до {formatRub(estimate.high)}</span>
            </div>
            <div className="quiz-price-per-m2">≈ {formatRub(estimate.perM2)} / м² · {answers.area || '—'} · {answers.ceiling_type || '—'}</div>

            <div className="quiz-result-benefit">
              <div className="quiz-benefit-row">
                <TrendingDown size={18} />
                <span>Замерщик выезжает <strong>бесплатно</strong> — экономия <strong>500 ₽</strong></span>
              </div>
              <div className="quiz-benefit-row">
                <ShieldCheck size={18} />
                <span>Гарантия <strong>до 10 лет</strong> на полотно и 1 год на монтаж</span>
              </div>
              <div className="quiz-benefit-row">
                <Calendar size={18} />
                <span>Дата монтажа <strong>в договоре</strong> — без переносов</span>
              </div>
            </div>

            <div className="quiz-result-what-next">
              <h4>Что дальше?</h4>
              <div className="quiz-next-item"><span className="quiz-next-num">1</span><span>Замерщик приедет в удобный день — бесплатно</span></div>
              <div className="quiz-next-item"><span className="quiz-next-num">2</span><span>Смета фиксируется в договоре в день замера</span></div>
              <div className="quiz-next-item"><span className="quiz-next-num">3</span><span>Монтаж в согласованный день, без переносов</span></div>
            </div>

            <div className="quiz-result-cta">
              <a className="btn btn-primary btn-lg btn-block" href="tel:+79370729998">
                <Phone size={18} /> Позвонить сейчас
              </a>
              <button className="btn btn-outline-dark btn-block quiz-result-close" onClick={onClose}>
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: (typeof products)[number]; onClose: () => void }) {
  return (
    <div className="detail-backdrop" onMouseDown={onClose}>
      <div className="detail-modal product-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="detail-close" aria-label="Закрыть" onClick={onClose}><X size={21} /></button>
        <img className="product-modal-img" src={product.img} alt={product.label} />
        <div className="product-modal-copy">
          <span className="eyebrow">Вид потолка</span>
          <h3>{product.label}</h3>
          <p>{product.description}</p>
          <h4>Почему выбирают</h4>
          <ul className="product-features">{product.features.map((feature) => <li key={feature}><CheckCircle2 size={16} />{feature}</li>)}</ul>
          <button className="btn btn-primary btn-lg" onClick={onClose}>Рассчитать стоимость</button>
        </div>
      </div>
    </div>
  );
}

function WorkModal({ work, index, total, onClose, onChange }: { work: Work; index: number; total: number; onClose: () => void; onChange: (next: number) => void }) {
  return (
    <div className="detail-backdrop" onMouseDown={onClose}>
      <div className="detail-modal work-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="detail-close" aria-label="Закрыть" onClick={onClose}><X size={21} /></button>
        <div className="work-modal-image-wrap"><img src={work.img} alt={work.title} /></div>
        <div className="work-modal-copy">
          <span className="eyebrow">Проект «Модерн»</span>
          <h3>{work.title}</h3>
          <div className="work-facts"><span><strong>Помещение</strong>{work.tag}</span><span><strong>Площадь</strong>{work.area}</span><span><strong>Система</strong>{work.ceiling}</span></div>
          <p>{work.detail}</p>
          <div className="work-modal-controls"><button aria-label="Предыдущий проект" onClick={() => onChange((index - 1 + total) % total)}><ChevronLeft size={20} /></button><span>{index + 1} / {total}</span><button aria-label="Следующий проект" onClick={() => onChange((index + 1) % total)}><ChevronRight size={20} /></button></div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── APP ───────────── */

function App() {
  const rootRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [filter, setFilter] = useState('Все работы');
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [worksVisible, setWorksVisible] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const reviewsPerPage = isMobile ? 1 : 3;
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => {
      setIsMobile(mq.matches);
      setReviewPage((prev) => {
        const maxPage = Math.ceil(reviews.length / (mq.matches ? 1 : 3)) - 1;
        return prev > maxPage ? 0 : prev;
      });
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const openQuiz = () => {
    setQuizOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredWorks = filter === 'Все работы' ? works : works.filter((w) => w.tag === filter);
  const visibleWorks = filteredWorks.slice(0, worksVisible);
  const hasMoreWorks = worksVisible < filteredWorks.length;
  const visibleReviews = reviews.slice(reviewPage * reviewsPerPage, reviewPage * reviewsPerPage + reviewsPerPage);

  return (
    <div ref={rootRef}>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollPct}%` }} />
      </div>

      {/* HEADER */}
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="header-inner">
          <a className="logo" href="#top" aria-label="Модерн"><img className="modern-logo" src="/images/modern-logo.jpg" alt="Модерн — натяжные потолки" /></a>
          <nav className="nav">
            <a href="#about">О нас</a>
            <a href="#why">Почему мы</a>
            <a href="#products">Потолки</a>
            <a href="#works">Работы</a>
            <a href="#process">Как работаем</a>
            <a href="#faq">Вопросы</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="header-right">
            <a className="header-phone" href="tel:+79370729998"><Phone size={16} /> +7 937 072 99 98</a>
            <button className="header-cta" onClick={openQuiz}>Рассчитать стоимость</button>
          </div>
          <button className="burger" aria-label="Меню" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <a href="#about" onClick={() => setMenuOpen(false)}>О нас</a>
        <a href="#why" onClick={() => setMenuOpen(false)}>Почему мы</a>
        <a href="#products" onClick={() => setMenuOpen(false)}>Потолки</a>
        <a href="#works" onClick={() => setMenuOpen(false)}>Работы</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>Как работаем</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>Вопросы</a>
        <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a>
        <button className="mm-quiz-btn" onClick={openQuiz}>Рассчитать стоимость</button>
        <a className="mm-phone" href="tel:+79370729998">+7 937 072 99 98</a>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-tech">
            <span>SAMARA · RU</span>
            <span className="ht-sep">·</span>
            <span>N 53°16′ · E 50°15′</span>
          </div>
          <div className="wrap hero-inner">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" />
                Натяжные потолки в Самаре
              </div>
              <h1 className="hero-h1">
                Натяжной потолок<br />от <span className="h1-accent">390 ₽/м²</span><br />без доплат на монтаже
              </h1>
              <p className="hero-sub">
                Узнайте предварительную стоимость за 1 минуту. Бесплатный замер по Самаре, точная смета и дата монтажа фиксируются в договоре в день визита.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary btn-lg" onClick={openQuiz}>
                  Узнать стоимость за 1 минуту
                </button>
                <a className="btn btn-outline btn-lg" href="#works">Смотреть работы</a>
              </div>
              <div className="hero-meta">
                <span className="hero-meta-tick" />
                Бесплатный замер по Самаре · Ответим за 15 минут
              </div>
              <div className="hero-proof">
                {heroProof.map((p) => (
                  <div className="proof-item" key={p.l}>
                    <span className="proof-num">{p.num}</span>
                    <span className="proof-v">{p.v}</span>
                    <span className="proof-l">{p.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <img className="hero-img" src="https://images.pexels.com/photos/38524265/pexels-photo-38524265.jpeg?auto=compress&cs=tinysrgb&h=1400&w=940" alt="Специалист устанавливает потолок" />
              <div className="hero-img-fade" />
              <div className="hero-badge-top">
                <span>Модерн</span>
                <small>потолки под ключ</small>
              </div>
              <div className="hero-info-card">
                <CheckCircle2 size={20} />
                <div>
                  <span>Смета за 1 визит</span>
                  <small>без пересчёта на монтаже</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section section" id="about">
          <div className="wrap">
            <div className="about-grid reveal">
              <div className="about-copy">
                <span className="eyebrow">О компании</span>
                <h2>«Модерн» — натяжные потолки в Самаре</h2>
                <p>Мы — профильная компания по натяжным потолкам в Самаре. Устанавливаем полотна любой сложности: матовые, глянцевые, сатиновые, парящие, с подсветкой и многоуровневые. Работаем по договору с фиксированной ценой и датой монтажа.</p>
                <p className="about-sub">Наши мастера — не подрядчики, а собственная бригада. Поэтому отвечаем за качество каждой точки и шва. После монтажа оставляем объект чистым, а гарантию оформляем письменно: до 10 лет на материалы и 1 год на работы.</p>
              </div>
              <div className="about-card">
                <div className="about-card-row"><span className="about-card-ic"><ShieldCheck size={20} /></span><div><strong>Работаем по договору</strong><p>Стоимость, состав работ и дата монтажа — письменно, до начала монтажа.</p></div></div>
                <div className="about-card-row"><span className="about-card-ic"><Ruler size={20} /></span><div><strong>Замер бесплатно</strong><p>Выезжаем по Самаре в день обращения и фиксируем точную смету.</p></div></div>
                <div className="about-card-row"><span className="about-card-ic"><Star size={20} /></span><div><strong>Свои монтажники</strong><p>Не подрядчики. Отвечаем за качество каждой точки и шва сами.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="why-section section" id="why">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Почему мы</span>
              <h2>Почему выбирают нас</h2>
              <div className="dash" />
            </div>
            <div className="why-grid">
              {whyCards.map((c) => (
                <div className="why-card reveal" key={c.num}>
                  <div className="why-card-glow" />
                  <span className="why-num">{c.num}</span>
                  <div className="why-ic"><c.icon size={23} /></div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="prod-section section alt" id="products">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Потолки</span>
              <h2>Подберём потолок под ваш интерьер</h2>
              <div className="dash" />
            </div>
            <div className="prod-grid">
              {products.map((p) => (
                <button className="prod-card reveal" key={p.label} onClick={() => setSelectedProduct(p)}>
                  <div className="prod-ic"><p.icon size={26} /></div>
                  <span className="l">{p.label}</span>
                  <span className="prod-arrow">Подробнее →</span>
                </button>
              ))}
            </div>
            <div className="prod-btn-row reveal">
              <button className="btn btn-outline-dark btn-lg" onClick={openQuiz}>Рассчитать стоимость</button>
            </div>
          </div>
        </section>

        {/* WORKS */}
        <section className="section" id="works">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Портфолио</span>
              <h2>Посмотрите, как меняется пространство</h2>
              <div className="dash" />
            </div>
            <div className="filters reveal">
              {workFilters.map((f) => (
                <button
                  className={filter === f ? 'filter-pill active' : 'filter-pill'}
                  key={f}
                  onClick={() => { setFilter(f); setWorksVisible(6); }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="works-grid">
              {visibleWorks.map((w) => (
                <button className="work-card reveal" key={w.title} onClick={() => setSelectedWork(works.indexOf(w))}>
                  <div className="work-img">
                    <img src={w.img} alt={w.title} loading="lazy" />
                    <div className="work-overlay"><span className="work-view">Подробнее →</span></div>
                    <span className="work-tag">{w.tag}</span>
                  </div>
                  <div className="work-info"><h3>{w.title}</h3><div className="work-meta">{w.ceiling} <span className="sep">·</span> {w.area}</div></div>
                </button>
              ))}
            </div>
            {hasMoreWorks && (
              <div className="works-more reveal">
                <button className="btn btn-outline-dark btn-lg" onClick={() => setWorksVisible((v) => v + 6)}>Показать ещё</button>
              </div>
            )}
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="section alt">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Преимущества</span>
              <h2>Всё необходимое — в одной работе</h2>
              <div className="dash" />
            </div>
            <div className="adv-grid">
              {advItems.map((a) => (
                <div className="adv-item reveal" key={a.title}>
                  <div className="adv-ic"><a.icon size={19} /></div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" id="process">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Как мы работаем</span>
              <h2>От квиза до сдачи</h2>
              <div className="dash" />
            </div>
            <div className="process-grid reveal">
              {processSteps.map((s, i) => (
                <div className="proc-step" key={s.num}>
                  <div className="proc-circle">{s.num}</div>
                  {i < processSteps.length - 1 && <div className="proc-arrow" />}
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section alt">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Отзывы</span>
              <h2>Клиенты рекомендуют нас за результат</h2>
              <div className="dash" />
            </div>
            <div className="reviews-shell">
              <button className="review-arrow" aria-label="Предыдущие отзывы" onClick={() => setReviewPage((reviewPage + totalReviewPages - 1) % totalReviewPages)}><ChevronLeft size={21} /></button>
              <div className="rev-grid">
                {visibleReviews.map((r) => (
                  <div className="rev-card reveal" key={r.name}>
                    <div className="rev-stars">{Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                    <p className="rev-text">{r.text}</p>
                    <div className="rev-author"><span className="rev-ava">{r.name[0]}</span><div><div className="rev-name">{r.name}</div><div className="rev-role">{r.role}</div></div></div>
                  </div>
                ))}
              </div>
              <button className="review-arrow" aria-label="Следующие отзывы" onClick={() => setReviewPage((reviewPage + 1) % totalReviewPages)}><ChevronRight size={21} /></button>
            </div>
            <div className="review-dots">{Array.from({ length: totalReviewPages }).map((_, i) => <button key={i} className={reviewPage === i ? 'review-dot active' : 'review-dot'} aria-label={`Отзыв ${i + 1}`} onClick={() => setReviewPage(i)} />)}</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Вопросы</span>
              <h2>Ответы перед началом ремонта</h2>
              <div className="dash" />
            </div>
            <div className="faq-list reveal">
              {faqs.map((f, i) => (
                <div className={faqOpen === i ? 'faq-item open' : 'faq-item'} key={f.q}>
                  <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="txt">{f.q}</span>
                    <span className="faq-toggle" />
                  </button>
                  <div className="faq-a">
                    <div className="faq-a-inner"><p>{f.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="cta">
          <div className="wrap cta-wrap">
            <div className="cta-block reveal">
              <div className="cta-photo"><img src="https://images.pexels.com/photos/29012622/pexels-photo-29012622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Современный интерьер с натяжным потолком" /></div>
              <div className="cta-right-wrap">
                <div className="cta-left">
                  <div className="cta-ic"><MessageSquare size={24} /></div>
                  <h2>Узнайте стоимость потолка за 1 минуту</h2>
                  <p className="cta-sub">Пройдите короткий квиз — узнаете предварительную стоимость потолка. Замерщик приедет бесплатно и зафиксирует точную смету в договоре.</p>
                  <div className="cta-points">
                    <span><CheckCircle2 size={16} /> Замер бесплатно — экономия 500 ₽</span>
                    <span><CheckCircle2 size={16} /> Точная смета в день визита</span>
                    <span><CheckCircle2 size={16} /> Гарантия до 10 лет</span>
                    <span><CheckCircle2 size={16} /> Без навязчивых звонков</span>
                  </div>
                </div>
                <div className="cta-right">
                  <button className="btn btn-white btn-lg cta-quiz-btn" onClick={openQuiz}>
                    Пройти квиз и узнать цену <ArrowRight size={20} />
                  </button>
                  <div className="cta-or">или позвоните: <a href="tel:+79370729998">+7 937 072 99 98</a></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTS */}
        <section className="section alt" id="contacts">
          <div className="wrap">
            <div className="h2-center reveal">
              <span className="eyebrow">Контакты</span>
              <h2>Запланируем потолок под ваш ремонт</h2>
              <div className="dash" />
            </div>
            <div className="contacts-grid reveal">
              <div className="contact-rows">
                <div className="contact-row">
                  <span className="contact-ic"><Phone size={18} /></span>
                  <div>
                    <div className="label">Телефон</div>
                    <div className="val"><a href="tel:+79370729998">+7 937 072 99 98</a></div>
                    <div className="val"><a href="tel:+78462217447">+7 846 221 74 47</a></div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-ic"><MapPin size={18} /></span>
                  <div>
                    <div className="label">Адрес</div>
                    <div className="val">г. Самара, Московское шоссе, 18-й км, 18</div>
                    <div className="val"><a href="https://yandex.ru/maps/org/modern/1184785697/?ll=50.270711%2C53.280011&z=17" target="_blank" rel="noreferrer">Открыть в Яндекс.Картах →</a></div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-ic"><Calendar size={18} /></span>
                  <div>
                    <div className="label">Режим работы</div>
                    <div className="val">Пн–Пт 9:00–18:00</div>
                  </div>
                </div>
                <div className="social-links"><a href="https://vk.ru/samara_potolok" target="_blank" rel="noreferrer" aria-label="ВКонтакте"><VkIcon size={19} /></a><a href="https://wa.me/79370729998" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone size={18} /></a></div>
                <button className="btn btn-primary btn-lg" onClick={openQuiz}>Вызвать бесплатного замерщика</button>
              </div>
              <div className="map-box">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=50.270711%2C53.280011&z=17&pt=50.270711,53.280011,pm2rdm"
                  title="Модерн на карте Самары"
                  loading="lazy"
                />
                <div className="map-caption">Выезжаем по всей Самаре и области бесплатно</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo"><img className="modern-logo" src="/images/modern-logo.jpg" alt="Модерн — натяжные потолки" /></div>
              <p>Натяжные потолки под ключ. Фиксированная цена и дата монтажа в договоре. Гарантия до 10 лет. Бесплатный замер по Самаре.</p>
            </div>
            <div className="footer-col">
              <h4>Услуги</h4>
              <ul>
                <li><a href="#products">Матовые потолки</a></li>
                <li><a href="#products">Глянцевые потолки</a></li>
                <li><a href="#products">Парящие потолки</a></li>
                <li><a href="#products">С подсветкой</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Компания</h4>
              <ul>
                <li><a href="#about">О нас</a></li>
                <li><a href="#why">Почему мы</a></li>
                <li><a href="#works">Работы</a></li>
                <li><a href="#process">Как работаем</a></li>
                <li><a href="#faq">Вопросы</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Адреса</h4>
              <ul>
                <li><a href="https://yandex.ru/maps/org/modern/1184785697/?ll=50.270711%2C53.280011&z=17" target="_blank" rel="noreferrer">Яндекс.Карты →</a></li>
                <li><a href="https://2gis.ru/samara/firm/2533804071724207" target="_blank" rel="noreferrer">2ГИС →</a></li>
                <li><a href="https://vk.ru/samara_potolok" target="_blank" rel="noreferrer">ВКонтакте →</a></li>
                <li><a href="#contacts">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-col footer-contacts">
              <h4>Контакты</h4>
              <div className="fc-row"><a href="tel:+79370729998">+7 937 072 99 98</a></div>
              <div className="fc-row"><a href="tel:+78462217447">+7 846 221 74 47</a></div>
              <div className="fc-row">Пн–Пт 9:00–18:00</div>
              <button className="btn btn-primary" onClick={openQuiz}>Рассчитать стоимость</button>
            </div>
          </div>
          <div className="legal-bar">
            <small>© 2026 Модерн. Натяжные потолки в Самаре.</small>
          </div>
        </div>
      </footer>

      <button
        className={showTop ? 'back-to-top show' : 'back-to-top'}
        aria-label="Наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </button>

      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {selectedWork !== null && <WorkModal work={works[selectedWork]} index={selectedWork} total={works.length} onClose={() => setSelectedWork(null)} onChange={setSelectedWork} />}
    </div>
  );
}

export default App;
