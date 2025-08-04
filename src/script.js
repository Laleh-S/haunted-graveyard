import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 
//                             Base
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░           
// ☰☰☰☰☰☰ Debug ☰☰☰☰☰☰
const gui = new GUI()

// ☰☰☰☰☰☰ Canvas ☰☰☰☰☰☰
const canvas = document.querySelector('canvas.webgl')

// ☰☰☰☰☰☰ Scene ☰☰☰☰☰☰
const scene = new THREE.Scene()


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Textures
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const textureLoader = new THREE.TextureLoader()

// ☰☰☰☰☰☰ Ground ☰☰☰☰☰☰
const groundAlphaTexture = textureLoader.load('/floor/alpha.jpg')
const groundColorTexture = textureLoader.load('/floor/rocky_terrain/rocky_terrain_diff_1k.jpg')
const groundArmTexture = textureLoader.load('/floor/rocky_terrain/rocky_terrain_arm_1k.jpg')
const groundNormalTexture = textureLoader.load('/floor/rocky_terrain/rocky_terrain_nor_gl_1k.jpg')
const groundDisplacementTexture = textureLoader.load('/floor/rocky_terrain/rocky_terrain_disp_1k.jpg')


groundColorTexture.colorSpace = THREE.SRGBColorSpace

// Ground Textures Setup: Tiling and Wrapping
groundColorTexture.repeat.set(15, 12)
groundColorTexture.wrapS = THREE.RepeatWrapping
groundColorTexture.wrapT = THREE.RepeatWrapping

groundArmTexture.repeat.set(15, 12)
groundArmTexture.wrapS = THREE.RepeatWrapping
groundArmTexture.wrapT = THREE.RepeatWrapping


groundNormalTexture.repeat.set(15, 12)
groundNormalTexture .wrapS = THREE.RepeatWrapping
groundNormalTexture .wrapT = THREE.RepeatWrapping


groundDisplacementTexture.repeat.set(15, 12)
groundDisplacementTexture.wrapS = THREE.RepeatWrapping
groundDisplacementTexture.wrapT = THREE.RepeatWrapping



// ☰☰☰☰☰☰ Walls ☰☰☰☰☰☰
const wallColorTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_diff_1k.jpg')
const wallArmTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_nor_gl_1k.jpg')
const wallDisplacementTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_disp_1k.jpg')


// const wallColorTexture = textureLoader.load('/wall/castle_brick_02_white/castle_brick_02_white_diff_1k.jpg')
// const wallArmTexture = textureLoader.load('/wall/castle_brick_02_white/castle_brick_02_white_arm_1k.jpg')
// const wallNormalTexture = textureLoader.load('/wall/castle_brick_02_white/castle_brick_02_white_nor_gl_1k.jpg')
// const wallDisplacementTexture = textureLoader.load('/wall/castle_brick_02_white/castle_brick_02_white_disp_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace


// ☰☰☰☰☰☰ Tower ☰☰☰☰☰☰
const  towerColorTexture = wallColorTexture
const  towerArmTexture = wallArmTexture
const  towerNormalTexture = wallNormalTexture
const  towerDisplacementTexture = wallDisplacementTexture


// ☰☰☰☰☰☰ Triangle ☰☰☰☰☰☰
const  triangleColorTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_diff_1k.jpg')
const  triangleArmTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_arm_1k.jpg')
const  triangleNormalTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_nor_gl_1k.jpg')
const  triangleDisplacementTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_disp_1k.jpg')
triangleColorTexture.colorSpace = THREE.SRGBColorSpace

triangleColorTexture.wrapS = THREE.RepeatWrapping;
triangleColorTexture.wrapT = THREE.RepeatWrapping;
triangleColorTexture.repeat.set(0.3, 0.5); 

triangleArmTexture.wrapS = THREE.RepeatWrapping;
triangleArmTexture.wrapT = THREE.RepeatWrapping;
triangleArmTexture.repeat.set(0.3, 0.5);

triangleNormalTexture.wrapS = THREE.RepeatWrapping;
triangleNormalTexture.wrapT = THREE.RepeatWrapping;
triangleNormalTexture.repeat.set(0.3, 0.5);


// ☰☰☰☰☰☰ Roof ☰☰☰☰☰☰
const roofColorTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofArmTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace

const towerRoofColorTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const towerRoofArmTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const towerRoofNormalTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
towerRoofColorTexture.colorSpace = THREE.SRGBColorSpace

towerRoofColorTexture.wrapS = THREE.RepeatWrapping;
towerRoofColorTexture.wrapT = THREE.RepeatWrapping;
towerRoofColorTexture.repeat.set(0.8, 0.8); 

towerRoofArmTexture.wrapS = THREE.RepeatWrapping;
towerRoofArmTexture.wrapT = THREE.RepeatWrapping;
towerRoofArmTexture.repeat.set(0.8, 0.8);

towerRoofNormalTexture.wrapS = THREE.RepeatWrapping;
towerRoofNormalTexture.wrapT = THREE.RepeatWrapping;
towerRoofNormalTexture.repeat.set(0.8, 0.8);



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Chapel
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   

// ☰☰☰☰☰☰ Ground ☰☰☰☰☰☰
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(25,25, 100, 100), // Add no more than 100 vertices for details, use normalMap instead.
    new THREE.MeshStandardMaterial({
        alphaMap: groundAlphaTexture,
        transparent: true, // Enables transparency support for alphaMap and opacity
        map: groundColorTexture,
        aoMap: groundArmTexture,
        roughnessMap: groundArmTexture,
        metalnessMap: groundArmTexture,
        normalMap: groundNormalTexture,
        displacementMap: groundDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2,
        // color: new THREE.Color('#aaaaaa') 
    })
)
ground.rotation.x = - Math.PI / 2
scene.add(ground)

// GUI controls for fine-tuning the ground's height map effect
gui.add(ground.material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement Scale')
gui.add(ground.material, 'displacementBias').min(-1).max(1).step(0.001).name('Ground Displacement')

// ☰☰☰☰☰☰ Chapel container ☰☰☰☰☰☰
const chapel = new THREE.Group()
scene.add(chapel)


// ☰☰☰☰☰☰ Main walls ☰☰☰☰☰☰
const mainWalls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.6, 5.5),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallArmTexture,
        roughnessMap: wallArmTexture,
        metalnessMap: wallArmTexture,
        normalMap: wallNormalTexture,
    })
)
mainWalls.position.y = 2.6 / 2  // Raise walls so they sit on the ground
chapel.add(mainWalls)


// ☰☰☰☰☰☰ Main roof ☰☰☰☰☰☰
const mainRoofGroup = new THREE.Group()

// Right panel
const rightPanel = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.1, 5.8),
  new THREE.MeshStandardMaterial({ 
        map: roofColorTexture,
        aoMap: roofArmTexture,
        roughnessMap: roofArmTexture,
        // metalnessMap: roofSpecTexture, 
        normalMap: roofNormalTexture,
        // bumpMap: roofBumpTexture,            // Bump map
        bumpScale: 0.2,  
  })
)

roofColorTexture.center.set(0.5, 0.5);
roofColorTexture.rotation = Math.PI / 2;

roofArmTexture.center.set(0.5, 0.5);
roofArmTexture.rotation = Math.PI / 2;


rightPanel.rotation.z = -Math.PI / 4
rightPanel.position.x = 1.05
rightPanel.position.y = 3.5 

// Left panel
const leftPanel = rightPanel.clone()
leftPanel.rotation.z = Math.PI / 4
leftPanel.position.x = -1.05
leftPanel.position.y = 3.5



mainRoofGroup.add(rightPanel, leftPanel) // Adds the panels to the mainRoofGroup
chapel.add(mainRoofGroup) // Adds the mainRoofGroup to the chapel 


// ☰☰☰☰☰☰ Traingle shape gap between roof panels ☰☰☰☰☰☰
const triangleGroup = new THREE.Group()

const triangleOutline = new THREE.Shape()
triangleOutline.moveTo(-2.1, 0)  // Bottom-left corner (x, y)
triangleOutline.lineTo(0, 2.1)  // Top peak 
triangleOutline.lineTo(2.1, 0)   // Bottom-right corner 

const triangleGeometry = new THREE.ShapeGeometry(triangleOutline) // Passing the gableOutlile to the geometry
const triangleMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
     map: triangleColorTexture,
        aoMap: triangleArmTexture,
        roughnessMap: triangleArmTexture,
        metalnessMap: triangleArmTexture,
        normalMap: triangleNormalTexture,

    })
const fronttriangle = new THREE.Mesh(triangleGeometry, triangleMaterial)
fronttriangle.position.set(0, 2.4, 2.76)

const backtriangle = fronttriangle.clone()
backtriangle.position.set(0, 2.4, -2.76)

triangleGroup.add(fronttriangle, backtriangle)
chapel.add(triangleGroup)



// ☰☰☰☰☰☰ Tower ☰☰☰☰☰☰
const towerGroup = new THREE.Group()
const tower = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 2, 1),
  new THREE.MeshStandardMaterial({
     map: towerColorTexture,
     aoMap: towerArmTexture,
        roughnessMap: towerArmTexture,
        metalnessMap: towerArmTexture,
        normalMap: towerNormalTexture,
  })
)
tower.position.z = 1.7
tower.position.y = 8.2 / 2 // Raise to sit on the ground (centered on height)


// Tower roof
const towerRoof = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 4),
  new THREE.MeshStandardMaterial({
        map: towerRoofColorTexture,
        aoMap: towerRoofArmTexture,
        roughnessMap: towerRoofArmTexture,
        // metalnessMap: towerRoofSpecTexture,
        normalMap: towerRoofNormalTexture,
        // bumpMap: towerRoofBumpTexture,
   })
)
towerRoof.rotation.y = Math.PI / 4 // Rotate so flat sides align with box walls
towerRoof.position.y = 5 + 1.2 / 2 // Tower height + half cone height
towerRoof.position.z = 1.7

towerGroup.add(tower, towerRoof) 
chapel.add(towerGroup)


// ☰☰☰☰☰☰ Cross ☰☰☰☰☰☰
const crossGroup = new THREE.Group()

const barGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.05)
const barMaterial = new THREE.MeshStandardMaterial({})

// Vertical bar
const verticalBar = new THREE.Mesh(barGeometry, barMaterial)
verticalBar.position.y = 6.4
verticalBar.position.z = 1.7

// Horizontal bar
const horizontalBar = new THREE.Mesh(barGeometry, barMaterial)
horizontalBar.rotation.z = Math.PI / 2
horizontalBar.position.y = 6.5
horizontalBar.position.z = 1.7

crossGroup.add(verticalBar, horizontalBar)
chapel.add(crossGroup)


// ☰☰☰☰☰☰ Door ☰☰☰☰☰☰
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 2.2),
    new THREE.MeshStandardMaterial({
        color: 'red'
    })
)
door.position.y = 1
door.position.z = 5.5 / 2 + 0.01 // walls depth / 2
chapel.add(door)



// ☰☰☰☰☰☰ Bushes ☰☰☰☰☰☰
const bushGeometry = new THREE.SphereGeometry(1, 16, 116)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 3.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 3.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 3.1)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 3.5)

chapel.add(bush1, bush2, bush3, bush4)


// ☰☰☰☰☰☰ Graves ☰☰☰☰☰☰
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
})

const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

for (let i = 0; i < 30; i ++){

    // Cordinates:
    const angle = Math.random() * Math.PI * 2 // Placing graves randomly around a full circle. 

    // Math.random() * 5 -> gives a number between 0 and <5 + 4 gives us a number between 5 and 10
    const radius = 5 + Math.random() * 5
    const x = Math.sin(angle) * radius 
    const z = Math.cos(angle) * radius 

    // Mesh:
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4 // Gives random height to graves between between 0 and +0.4
    grave.position.z = z

    // Randomly tilt graves:
    grave.rotation.x = Math.random() - 0.5 // Changes the value between -0.5 to 0.5. 
    grave.rotation.y = Math.random() - 0.5
    grave.rotation.z = Math.random() - 0.5

    gravesGroup.add(grave)
}



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Lights
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
// ☰☰☰☰☰☰ Ambient light ☰☰☰☰☰☰
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Sizes
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //☰☰☰☰☰☰ Update sizes ☰☰☰☰☰☰
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // ☰☰☰☰☰☰ Update camera ☰☰☰☰☰☰
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // ☰☰☰☰☰☰ Update renderer ☰☰☰☰☰☰
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Camera
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   

// ☰☰☰☰☰☰ Base camera ☰☰☰☰☰☰
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const camera = new THREE.PerspectiveCamera(95, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(4, 2, 5)
camera.position.set(4, 3, 8)
camera.lookAt(0, 1, 0)
scene.add(camera)

// ☰☰☰☰☰☰ Controls ☰☰☰☰☰☰
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Focus the camera on the center of the house
// controls.target.set(0, 1, 2)
// controls.update()

// ☰☰☰☰☰☰ Camera helper ☰☰☰☰☰☰
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                          Renderer 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Animate    
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const timer = new Timer()

const tick = () =>
{
    // ☰☰☰☰☰☰  Timer ☰☰☰☰☰☰  
    timer.update()
    const elapsedTime = timer.getElapsed()

    // ☰☰☰☰☰☰ Update controls ☰☰☰☰☰☰
    controls.update()

    // ☰☰☰☰☰☰ Render ☰☰☰☰☰☰
    renderer.render(scene, camera)

    // ☰☰☰☰☰☰ Call tick again on the next frame ☰☰☰☰☰☰
    window.requestAnimationFrame(tick)
}

tick()



