import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
   // Предустановка, которая используется в качестве основы для настройки Jest.
   preset: 'ts-jest',
   // Указывает, следует ли сообщать о каждом отдельном тесте во время выполнения.
   verbose: true,
   // Форматы в каких собирается покрытие тестов
   coverageReporters: ['text-summary'],
   // Минимальное покрытие
   coverageThreshold: {
      global: {
         lines: 70,
         statements: 70,
         branches: 70,
         functions: 70,
      },
   },
   // Jest запускает код как JS, поэтому при использовании TS его нужно преобразовать через установленный пакет ts-jest
   transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
   },
   // Unit тесты в проекте обозначаются через test.ts
   testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
   // Массив имен в которых Jest ищет нужные себе файлы
   // Путь src для алиасов настроенных в папке ts.config
   moduleDirectories: ['node_modules', 'src'],
};

export default config;
