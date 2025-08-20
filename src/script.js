import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
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
const groundColorTexture = textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const groundArmTexture = textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const groundNormalTexture = textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const groundDisplacementTexture = textureLoader.load('/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')
groundColorTexture.colorSpace = THREE.SRGBColorSpace

const groundTexturesRepeat = [
    groundColorTexture, 
    groundArmTexture, 
    groundNormalTexture, 
    groundDisplacementTexture
]
groundTexturesRepeat.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)
})



// ☰☰☰☰☰☰ Walls ☰☰☰☰☰☰
const wallColorTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_diff_1k.jpg')
const wallArmTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_nor_gl_1k.jpg')
const wallDisplacementTexture = textureLoader.load('/wall/castle_brick_broken/castle_brick_broken_06_disp_1k.jpg')
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

const triangleTexturesRepeat = [
    triangleColorTexture, 
    triangleArmTexture, 
    triangleNormalTexture, 
]
triangleTexturesRepeat.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(0.3, 0.3)
})


// ☰☰☰☰☰☰ Roof ☰☰☰☰☰☰
const roofColorTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofArmTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace


// ☰☰☰☰☰☰ Tower roof ☰☰☰☰☰☰
const towerRoofColorTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const towerRoofArmTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const towerRoofNormalTexture = textureLoader.load('/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
towerRoofColorTexture.colorSpace = THREE.SRGBColorSpace

const towerRoofTexturesRepeat = [
    towerRoofColorTexture, 
    towerRoofArmTexture, 
    towerRoofNormalTexture, 
]
towerRoofTexturesRepeat.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(0.8, 0.8)
})


// ☰☰☰☰☰☰ Bush ☰☰☰☰☰☰
const bushColorTexture = textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushArmTexture = textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')
bushColorTexture.colorSpace = THREE.SRGBColorSpace


// ☰☰☰☰☰☰ Grave ☰☰☰☰☰☰
const graveColorTexture = textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveArmTexture = textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')
graveColorTexture.colorSpace = THREE.SRGBColorSpace


graveColorTexture.repeat.set(0.4, 0.5) // Asking the texture to repeat 0.3 times horizontally (U) and 0.4 times vertically (V)
graveArmTexture.repeat.set(0.4, 0.5)
graveNormalTexture.repeat.set(0.4, 0.5)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Models
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const loader = new GLTFLoader()

// ☰☰☰☰☰☰ Door ☰☰☰☰☰☰
loader.load('./models/door.glb', (gltf) => {
    const doorModel = gltf.scene

    // Scale the model before creating its bounding box so the box matches the scaled size. 
    doorModel.scale.set(0.8, 0.9, 0.8)

    // .Box3() creates an empty 3D bounding box
    // .setFromObject(doorModel) calculates the bounding box that tightly wraps all visible geometry inside doorModel
    const box = new THREE.Box3().setFromObject(doorModel)
    const center = new THREE.Vector3() // Creates a Vector3 to hold the center of the model (x, y, z)
    const size = new THREE.Vector3() // Creates a Vector3 to hold the size of the model (width, height, depth)

    box.getCenter(center)  // Get the center of the model
    box.getSize(size)   // Get the full width/height/depth
    doorModel.position.sub(center)

    doorModel.rotation.y = -Math.PI / 2
    doorModel.position.y += (size.y / 2) - 0.2 // Lifts up the door so the bottom is on the ground
    doorModel.position.z = 5.9
    doorModel.position.x = -1.7
    chapel.add(doorModel)

})


// ☰☰☰☰☰☰ Tower window ☰☰☰☰☰☰
const towerWindowGroup = new THREE.Group()

//  ---- Window model ----
loader.load('./models/towerWindow.glb', (gltf) => {
    const towerWindowModel = gltf.scene
    towerWindowModel.scale.set(0.011, 0.011, 0.03)

    // ---- Window glow ----
    const glow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.33, 0.05, 32), // radiusTop, radiusBottom, height, radialSegments
        new THREE.MeshStandardMaterial({ 
            color: '#FFC000',
            emissive: '#ff7d46',
        })    
    )
    glow.rotation.x = Math.PI / 2
    towerWindowGroup.position.z = 5

    towerWindowGroup.position.y = 4.7
    towerWindowGroup.position.z = 2.2
    
    towerWindowGroup.add(towerWindowModel, glow)
    chapel.add(towerWindowGroup)
})


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
        displacementScale: 0.1,
        displacementBias: - 0.2,
        color: '#aaaaaa',
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
    new THREE.BoxGeometry(4.1, 3, 5.5),
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

// Roof geometry and material (shared by both panels)
const panelGeometry = new THREE.BoxGeometry(2.65, 0.1, 5.8)
const panelMaterial = new THREE.MeshStandardMaterial({ 
        map: roofColorTexture,
        aoMap: roofArmTexture,
        roughnessMap: roofArmTexture,
        normalMap: roofNormalTexture,  
})
// Texture rotation to align with the roof
roofColorTexture.center.set(0.5, 0.5)
roofColorTexture.rotation = Math.PI / 2

roofArmTexture.center.set(0.5, 0.5)
roofArmTexture.rotation = Math.PI / 2

// Right roof panel
const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial)
rightPanel.rotation.z = -Math.PI / 5
rightPanel.position.x = 1.05
rightPanel.position.y = 3.5 


// Left roof panel (mirrored)
const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial)
leftPanel.rotation.z = Math.PI / 5
leftPanel.position.x = -1.05
leftPanel.position.y = 3.5

mainRoofGroup.add(rightPanel, leftPanel) 
chapel.add(mainRoofGroup) 



// ☰☰☰☰☰☰ Traingles between the roof panels ☰☰☰☰☰☰
const triangleGroup = new THREE.Group()

const triangleOutline = new THREE.Shape()
triangleOutline.moveTo(-2.1, 0)  // Bottom-left corner (x, y)
triangleOutline.lineTo(0, 1.5)  // Top peak 
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
fronttriangle.position.set(0, 2.7, 2.76)

const backtriangle = fronttriangle.clone()
backtriangle.position.set(0, 2.7, -2.76)

triangleGroup.add(fronttriangle, backtriangle)
chapel.add(triangleGroup)



// ☰☰☰☰☰☰ Tower ☰☰☰☰☰☰
// Tower walls
const towerGroup = new THREE.Group()
const towerWalls = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 1.5, 1),
  new THREE.MeshStandardMaterial({
     map: towerColorTexture,
     aoMap: towerArmTexture,
        roughnessMap: towerArmTexture,
        metalnessMap: towerArmTexture,
        normalMap: towerNormalTexture,
  })
)
towerWalls.position.z = 1.7
towerWalls.position.y = 4.4 


// Tower roof
const towerRoof = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 4),
  new THREE.MeshStandardMaterial({
        map: towerRoofColorTexture,
        aoMap: towerRoofArmTexture,
        roughnessMap: towerRoofArmTexture,
        normalMap: towerRoofNormalTexture,
   })
)
towerRoof.rotation.y = Math.PI / 4 // Rotate so flat sides align with box walls
towerRoof.position.y = 5.1 + 1 / 2 // Tower height + half cone height
towerRoof.position.z = 1.7

towerGroup.add(towerWalls, towerRoof) 
chapel.add(towerGroup)



// ☰☰☰☰☰☰ Cross ☰☰☰☰☰☰
const crossGroup = new THREE.Group()

const barGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.05)
const barMaterial = new THREE.MeshStandardMaterial({
    color: '#d0d0d0',
    roughness: 0.4,  
    metalness: 1
 })


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


// ☰☰☰☰☰☰ Door Roof canopy ☰☰☰☰☰☰
const doorcanopyGroup = new THREE.Group()

const canopyGeometry = new THREE.BoxGeometry(1.2, 0.1, 1)
const canopyMaterial = new THREE.MeshStandardMaterial({
    color: '#31312f' 
})
const canopyRightPanel = new THREE.Mesh(canopyGeometry, canopyMaterial)
canopyRightPanel.rotation.z = - Math.PI / 6
canopyRightPanel.position.set(0.5, 0.5, 0) 

const canopyLeftPanel = new THREE.Mesh(canopyGeometry, canopyMaterial)
canopyLeftPanel.rotation.z = Math.PI / 6
canopyLeftPanel.position.set(-0.5, 0.5, 0)

doorcanopyGroup.position.set(0, 2.1, 2.8)

doorcanopyGroup.add(canopyRightPanel, canopyLeftPanel)
chapel.add(doorcanopyGroup)



// ☰☰☰☰☰☰ Bushes ☰☰☰☰☰☰
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc', // Changed the texture color for bushes.
    map: bushColorTexture,
    aoMap: bushArmTexture,
    roughnessMap: bushArmTexture,
    metalnessMap: bushArmTexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 3.2)
bush1.rotation.x = - 0.75 // Rotated the sphere to hide visible texture imperfection issues on the surface.

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 3.1)
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 3.1)
bush3.rotation.x = - 0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 3.5)
bush4.rotation.x = - 0.75

chapel.add(bush1, bush2, bush3, bush4)



// ☰☰☰☰☰☰ Graves ☰☰☰☰☰☰
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveArmTexture,
    roughnessMap: graveArmTexture,
    metalnessMap: graveArmTexture,
    normalMap: graveArmTexture,
    
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
const ambientLight = new THREE.AmbientLight('#86cdff', 0.5)
scene.add(ambientLight)

// ☰☰☰☰☰☰ Directional light ☰☰☰☰☰☰
const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.decay = 3
doorLight.position.set(0, 2.2, 3.2)
chapel.add(doorLight)

const doorLightFolder = gui.addFolder( 'Door Light' )
doorLightFolder.addColor(doorLight, 'color').min(0).max(3).step(0.001).name('Door Light Color')
doorLightFolder.add(doorLight, 'intensity').min(0.2).max(3).step(0.001).name('Door Light Intensity')




// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Ghost
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)



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
const cameraHelper = new THREE.CameraHelper(camera)
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
//                         Shadows
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   

// ☰☰☰☰☰☰ Renderer ☰☰☰☰☰☰
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// ☰☰☰☰☰☰ Cast and receive  ☰☰☰☰☰☰
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

mainWalls.castShadow = true
mainWalls.receiveShadow = true

towerWalls.castShadow = true
towerWalls.receiveShadow = true

ground.receiveShadow = true

gravesGroup.children.forEach((grave) => {
    // console.log(grave)
    grave.castShadow = true
    grave.receiveShadow = true
})


// ☰☰☰☰☰☰ Mapping ☰☰☰☰☰☰
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20


ghost1.shadow.mapSize.width = 1024
ghost1.shadow.mapSize.height = 1024
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 1024
ghost2.shadow.mapSize.height = 1024
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 1024
ghost3.shadow.mapSize.height = 1024
ghost3.shadow.camera.far = 10

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Animate    
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const timer = new Timer()

const tick = () =>
{
    // ☰☰☰☰☰☰  Timer ☰☰☰☰☰☰  
    timer.update()
    const elapsedTime = timer.getElapsed()


    // ☰☰☰☰☰☰  Ghost ☰☰☰☰☰☰  
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.4
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.25
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)
    

    // ☰☰☰☰☰☰ Update controls ☰☰☰☰☰☰
    controls.update()

    // ☰☰☰☰☰☰ Render ☰☰☰☰☰☰
    renderer.render(scene, camera)

    // ☰☰☰☰☰☰ Call tick again on the next frame ☰☰☰☰☰☰
    window.requestAnimationFrame(tick)
}

tick()



