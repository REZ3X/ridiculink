import clientPromise from '../lib/mongodb.js';
import crypto from 'crypto';

export class LongURL {
  static async create(originalUrl) {
    try {
      console.log('Attempting to create long URL for:', originalUrl);
      
      const client = await clientPromise;
      console.log('MongoDB client connected successfully');
      
      const db = client.db('ridiculink');
      const collection = db.collection('urls');
      console.log('Connected to ridiculink database and urls collection');

      console.log('Checking for existing URL...');
      const existingUrl = await collection.findOne({
        originalUrl,
        expiresAt: { $gt: new Date() }
      });

      if (existingUrl) {
        console.log('Found existing valid URL');
        return {
          longUrl: existingUrl.longUrl,
          originalUrl: existingUrl.originalUrl,
          createdAt: existingUrl.createdAt,
          expiresAt: existingUrl.expiresAt,
          isExisting: true
        };
      }

      console.log('No existing URL found, generating new one...');
      
      const longUrl = this.generateRidiculouslyLongUrl(originalUrl);
      console.log('Generated long URL:', longUrl);
      
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 

      const urlDoc = {
        longUrl,
        originalUrl,
        createdAt: now,
        expiresAt,
        clicks: 0
      };

      console.log('Inserting document:', urlDoc);
      const result = await collection.insertOne(urlDoc);
      console.log('Insert result:', result);
      
      return { ...urlDoc, isExisting: false };
    } catch (error) {
      console.error('Detailed error in LongURL.create:', error);
      console.error('Error stack:', error.stack);
      throw new Error(`Failed to create long URL: ${error.message}`);
    }
  }

  static async findByLongUrl(longUrl) {
    try {
      console.log('Finding URL by longUrl:', longUrl);
      
      const client = await clientPromise;
      const db = client.db('ridiculink');
      const collection = db.collection('urls');

      const urlDoc = await collection.findOne({
        longUrl,
        expiresAt: { $gt: new Date() }
      });

      if (urlDoc) {
        console.log('Found URL document, incrementing clicks');
        await collection.updateOne(
          { _id: urlDoc._id },
          { $inc: { clicks: 1 } }
        );
      } else {
        console.log('No valid URL document found');
      }

      return urlDoc;
    } catch (error) {
      console.error('Detailed error in LongURL.findByLongUrl:', error);
      throw new Error(`Failed to find URL: ${error.message}`);
    }
  }

  static generateRidiculouslyLongUrl(originalUrl) {
    const urlHash = crypto.createHash('md5').update(originalUrl + Date.now()).digest('hex').substring(0, 8);
    
    const superlatives = [
      'extraordinarily', 'magnificently', 'tremendously', 'incredibly', 'absolutely',
      'phenomenally', 'spectacularly', 'ridiculously', 'astronomically', 'monumentally',
      'unbelievably', 'overwhelmingly', 'superlatively', 'exceptionally', 'remarkably',
      'astonishingly', 'breathtakingly', 'mind-blowingly', 'jaw-droppingly', 'stupendously',
      'fantastically', 'marvelously', 'wondrously', 'sublimely', 'divinely'
    ];

    const technicalAdjectives = [
      'quantum-encrypted', 'blockchain-verified', 'AI-optimized', 'cloud-native', 'edge-computed',
      'neural-network-enhanced', 'machine-learning-powered', 'deep-learning-trained', 
      'algorithmically-perfected', 'cryptographically-secured', 'molecularly-structured',
      'atomically-precise', 'nanotechnology-enabled', 'bio-engineered', 'cyber-enhanced'
    ];

    const nouns = [
      'hyperlink', 'connection', 'pathway', 'bridge', 'portal', 'gateway',
      'channel', 'conduit', 'passage', 'route', 'corridor', 'avenue',
      'thoroughfare', 'expressway', 'superhighway', 'information-autobahn',
      'data-pipeline', 'digital-tunnel', 'cyber-bridge', 'web-portal',
      'internet-gateway', 'network-conduit', 'virtual-pathway', 'electronic-boulevard'
    ];

    const purposes = [
      'that-leads-to-your-desired-destination',
      'for-accessing-the-requested-content',
      'to-transport-you-to-the-specified-location',
      'designed-for-seamless-navigation',
      'engineered-for-optimal-user-experience',
      'crafted-with-precision-and-care',
      'built-using-cutting-edge-technology',
      'developed-with-state-of-the-art-algorithms',
      'optimized-for-maximum-performance-and-reliability',
      'authenticated-through-advanced-security-protocols',
      'validated-by-industry-leading-experts',
      'certified-for-enterprise-grade-applications',
      'tested-across-multiple-platforms-and-devices',
      'verified-through-rigorous-quality-assurance-processes'
    ];

    const technicalSpecs = [
      'supporting-ipv6-and-http3-protocols',
      'with-ssl-tls-encryption-and-csrf-protection',
      'featuring-advanced-load-balancing-capabilities',
      'implementing-microservices-architecture-patterns',
      'utilizing-containerized-deployment-strategies',
      'powered-by-distributed-computing-infrastructure',
      'enhanced-with-real-time-analytics-and-monitoring',
      'secured-through-multi-factor-authentication-systems'
    ];

    const randomElements = [
      'quantum', 'neutron', 'photon', 'electron', 'proton', 'boson', 'quark',
      'plasma', 'fusion', 'fission', 'cosmic', 'stellar', 'galactic', 'universal',
      'dimensional', 'temporal', 'spatial', 'digital', 'binary', 'hexadecimal'
    ];

    const randomSuperlative = superlatives[Math.floor(Math.random() * superlatives.length)];
    const randomTechnical = technicalAdjectives[Math.floor(Math.random() * technicalAdjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)];
    const randomSpec = technicalSpecs[Math.floor(Math.random() * technicalSpecs.length)];
    const randomElement1 = randomElements[Math.floor(Math.random() * randomElements.length)];
    const randomElement2 = randomElements[Math.floor(Math.random() * randomElements.length)];
    
    const timestamp = Date.now();
    const randomSuffix1 = Math.random().toString(36).substring(2, 10);
    const randomSuffix2 = Math.random().toString(36).substring(2, 8);
    const randomNumber = Math.floor(Math.random() * 999999) + 100000;
    
    const uuid = crypto.randomUUID().replace(/-/g, '');

    const components = [
      randomSuperlative,
      randomTechnical,
      randomNoun,
      randomPurpose,
      randomSpec,
      `incorporating-${randomElement1}-${randomElement2}-technologies`,
      `created-on-${timestamp}`,
      `with-hash-identifier-${urlHash}`,
      `featuring-unique-uuid-${uuid.substring(0, 12)}`,
      `authenticated-with-token-${randomSuffix1}`,
      `verified-through-session-${randomSuffix2}`,
      `secured-with-sequence-${randomNumber}`,
      `optimized-for-performance-metrics-${Math.floor(Math.random() * 10000)}`,
      `validated-against-security-standards-iso27001-compliant`,
      `tested-across-${Math.floor(Math.random() * 50) + 10}-different-environments`,
      `supporting-up-to-${Math.floor(Math.random() * 1000000) + 100000}-concurrent-connections`
    ];

    for (let i = components.length - 1; i > 0; i--) {
      if (Math.random() < 0.3) { 
        const j = Math.floor(Math.random() * (i + 1));
        [components[i], components[j]] = [components[j], components[i]];
      }
    }

    return components.join('-');
  }
}